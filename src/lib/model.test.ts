import { describe, expect, it } from 'vitest'
import {
  REFERENCE_SPEED_KMH,
  consumptionAtSpeed,
  evaluateTrip,
  sweepSpeeds,
} from './model'
import type { TripInputs } from '../types'

const base: TripInputs = {
  distanceKm: 600,
  targetSpeedKmh: 120,
  consumptionKwhPer100Km: 18,
  chargePowerKw: 120,
  batteryKwh: 75,
  pricePerKwh: 0.4,
  departureSoc: 1,
  arrivalSoc: 0.1,
  stopOverheadMin: 5,
}

describe('consumptionAtSpeed', () => {
  it('returns the reference value at the reference speed', () => {
    expect(consumptionAtSpeed(18, REFERENCE_SPEED_KMH)).toBeCloseTo(18, 6)
  })

  it('increases with speed in the highway range', () => {
    const slow = consumptionAtSpeed(18, 90)
    const fast = consumptionAtSpeed(18, 150)
    expect(fast).toBeGreaterThan(slow)
  })
})

describe('evaluateTrip', () => {
  it('computes energy as distance * consumption / 100', () => {
    const r = evaluateTrip({ ...base, targetSpeedKmh: REFERENCE_SPEED_KMH })
    expect(r.energyKwh).toBeCloseTo((600 * 18) / 100, 6)
  })

  it('charges only the energy beyond the initial usable charge', () => {
    const r = evaluateTrip(base)
    const initialUsable = 75 * (1 - 0.1)
    expect(r.chargingEnergyKwh).toBeCloseTo(
      Math.max(0, r.energyKwh - initialUsable),
      6,
    )
  })

  it('needs no charging for a short trip within battery range', () => {
    const r = evaluateTrip({ ...base, distanceKm: 50 })
    expect(r.chargingEnergyKwh).toBe(0)
    expect(r.stops).toBe(0)
    expect(r.chargingHours).toBe(0)
  })

  it('cost is energy times price regardless of starting charge', () => {
    const r = evaluateTrip(base)
    expect(r.costEur).toBeCloseTo(r.energyKwh * 0.4, 6)
  })

  it('total time is driving plus charging time', () => {
    const r = evaluateTrip(base)
    expect(r.totalHours).toBeCloseTo(r.drivingHours + r.chargingHours, 6)
  })
})

describe('sweepSpeeds', () => {
  it('spans the target speed ±30% and is sorted ascending', () => {
    const results = sweepSpeeds(base)
    const speeds = results.map((r) => r.speedKmh)
    expect(Math.min(...speeds)).toBeCloseTo(120 * 0.7, 5)
    expect(Math.max(...speeds)).toBeCloseTo(120 * 1.3, 5)
    for (let i = 1; i < speeds.length; i++) {
      expect(speeds[i]).toBeGreaterThanOrEqual(speeds[i - 1])
    }
  })

  it('includes the exact target speed', () => {
    const results = sweepSpeeds(base)
    expect(results.some((r) => Math.abs(r.speedKmh - 120) < 1e-6)).toBe(true)
  })
})
