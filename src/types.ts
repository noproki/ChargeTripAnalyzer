export interface Vehicle {
  id: string
  /** Manufacturer + model shown in the picker. */
  name: string
  /** Usable battery capacity in kWh. */
  batteryKwh: number
  /**
   * Reference energy consumption in kWh/100km, interpreted at
   * {@link REFERENCE_SPEED_KMH}. The model scales this with speed.
   */
  consumptionKwhPer100Km: number
  /** Average DC charging power across the 10%–80% SoC window, in kW. */
  chargePower10To80Kw: number
}

/** Everything needed to evaluate a single trip scenario. */
export interface TripInputs {
  /** One-way driving distance in km. */
  distanceKm: number
  /** Target average driving speed in km/h. */
  targetSpeedKmh: number
  /** Reference consumption in kWh/100km (at the reference speed). */
  consumptionKwhPer100Km: number
  /** Average 10%–80% charging power in kW. */
  chargePowerKw: number
  /** Usable battery capacity in kWh. */
  batteryKwh: number
  /** Electricity price in EUR per kWh. */
  pricePerKwh: number
  /** State of charge at departure, 0..1. */
  departureSoc: number
  /** State of charge you are willing to arrive / stop charging-low at, 0..1. */
  arrivalSoc: number
  /** Fixed time overhead per charging stop, in minutes (detour, plug-in, etc.). */
  stopOverheadMin: number
}

/** Result of evaluating a trip at one speed. */
export interface TripResult {
  speedKmh: number
  /** Consumption used at this speed, kWh/100km. */
  consumptionKwhPer100Km: number
  /** Total energy consumed over the trip, kWh. */
  energyKwh: number
  /** Energy that must be replenished by charging en route, kWh. */
  chargingEnergyKwh: number
  /** Number of charging stops required. */
  stops: number
  /** Pure driving time, hours. */
  drivingHours: number
  /** Time spent charging (incl. per-stop overhead), hours. */
  chargingHours: number
  /** drivingHours + chargingHours. */
  totalHours: number
  /** Total energy cost for the trip, EUR. */
  costEur: number
}
