import type { TripInputs, TripResult } from '../types'

/**
 * Speed (km/h) at which a vehicle's quoted consumption figure is assumed to be
 * measured. The consumption a user enters (or that comes from the vehicle
 * database) is treated as the consumption at this speed, and the model scales
 * it up or down for other speeds.
 */
export const REFERENCE_SPEED_KMH = 100

/** Usable SoC window of a single 10%→80% fast-charge session (0.7). */
export const CHARGE_WINDOW = 0.7

/**
 * Relative shape of energy consumption as a function of speed.
 *
 * Real EV consumption per km is dominated by three terms:
 *  - aerodynamic drag, which grows with the square of speed,
 *  - rolling resistance, roughly constant with speed,
 *  - auxiliary loads (HVAC, electronics), constant in power and therefore
 *    larger per km at low speed.
 *
 * Coefficients are normalised so the shape ≈ 1 at {@link REFERENCE_SPEED_KMH}
 * with an aero/rolling/aux split of about 50/35/15 — a typical mid-size EV.
 * The absolute value is irrelevant; only the ratio between two speeds is used.
 */
export function consumptionShape(speedKmh: number): number {
  const v = Math.max(5, speedKmh)
  const aero = 5e-5 * v * v
  const rolling = 0.35
  const aux = 15 / v
  return aero + rolling + aux
}

/**
 * Consumption (kWh/100km) at a given speed, derived from a reference figure
 * quoted at {@link REFERENCE_SPEED_KMH}.
 */
export function consumptionAtSpeed(
  referenceConsumption: number,
  speedKmh: number,
): number {
  return (
    (referenceConsumption * consumptionShape(speedKmh)) /
    consumptionShape(REFERENCE_SPEED_KMH)
  )
}

function clampSoc(soc: number): number {
  return Math.min(1, Math.max(0, soc))
}

/** Evaluate a single trip scenario at the given inputs. */
export function evaluateTrip(inputs: TripInputs): TripResult {
  const {
    distanceKm,
    targetSpeedKmh,
    consumptionKwhPer100Km,
    chargePowerKw,
    batteryKwh,
    pricePerKwh,
    stopOverheadMin,
  } = inputs

  const speed = Math.max(1, targetSpeedKmh)
  const departureSoc = clampSoc(inputs.departureSoc)
  const arrivalSoc = clampSoc(inputs.arrivalSoc)

  const consumption = consumptionAtSpeed(consumptionKwhPer100Km, speed)
  const energyKwh = (distanceKm * consumption) / 100

  // Energy available before the first charge: from departure SoC down to the
  // SoC you are willing to arrive at / start charging from.
  const initialUsableKwh = Math.max(
    0,
    batteryKwh * (departureSoc - arrivalSoc),
  )
  const chargingEnergyKwh = Math.max(0, energyKwh - initialUsableKwh)

  // Energy added per charging session (one 10%→80% window).
  const perStopKwh = batteryKwh * CHARGE_WINDOW
  const stops =
    chargingEnergyKwh > 0 && perStopKwh > 0
      ? Math.ceil(chargingEnergyKwh / perStopKwh)
      : 0

  const drivingHours = distanceKm / speed
  const chargingHours =
    (chargePowerKw > 0 ? chargingEnergyKwh / chargePowerKw : 0) +
    (stops * stopOverheadMin) / 60

  return {
    speedKmh: speed,
    consumptionKwhPer100Km: consumption,
    energyKwh,
    chargingEnergyKwh,
    stops,
    drivingHours,
    chargingHours,
    totalHours: drivingHours + chargingHours,
    // You pay for all energy consumed on the trip, regardless of how much
    // came from the starting charge.
    costEur: energyKwh * pricePerKwh,
  }
}

/**
 * Sweep the target speed by ±`spreadPct` and evaluate the trip at each point.
 * Returns results ordered from slowest to fastest, always including the exact
 * target speed.
 */
export function sweepSpeeds(
  inputs: TripInputs,
  spreadPct = 0.3,
  points = 13,
): TripResult[] {
  const target = Math.max(1, inputs.targetSpeedKmh)
  const min = target * (1 - spreadPct)
  const max = target * (1 + spreadPct)
  const step = points > 1 ? (max - min) / (points - 1) : 0

  const speeds: number[] = []
  for (let i = 0; i < points; i++) {
    speeds.push(min + step * i)
  }
  // Guarantee the exact target speed is represented.
  if (!speeds.some((s) => Math.abs(s - target) < 1e-6)) {
    speeds.push(target)
  }
  speeds.sort((a, b) => a - b)

  return speeds.map((speed) => evaluateTrip({ ...inputs, targetSpeedKmh: speed }))
}
