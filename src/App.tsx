import { useMemo, useState } from 'react'
import { TripForm } from './components/TripForm'
import { ResultChart } from './components/ResultChart'
import { ResultSummary } from './components/ResultSummary'
import { VEHICLES } from './data/vehicles'
import { evaluateTrip, sweepSpeeds } from './lib/model'
import type { TripInputs } from './types'

export interface FormState {
  mode: 'vehicle' | 'manual'
  vehicleId: string
  manualConsumption: number
  manualChargePower: number
  manualBattery: number
  start: string
  destination: string
  distanceKm: number
  targetSpeedKmh: number
  pricePerKwh: number
  departureSocPct: number
  arrivalSocPct: number
  stopOverheadMin: number
}

const DEFAULT_FORM: FormState = {
  mode: 'vehicle',
  vehicleId: VEHICLES[0].id,
  manualConsumption: 18,
  manualChargePower: 120,
  manualBattery: 60,
  start: 'Munich',
  destination: 'Berlin',
  distanceKm: 585,
  targetSpeedKmh: 120,
  pricePerKwh: 0.4,
  departureSocPct: 100,
  arrivalSocPct: 10,
  stopOverheadMin: 5,
}

function resolveVehicleSpecs(form: FormState) {
  if (form.mode === 'manual') {
    return {
      consumptionKwhPer100Km: form.manualConsumption,
      chargePowerKw: form.manualChargePower,
      batteryKwh: form.manualBattery,
    }
  }
  const vehicle =
    VEHICLES.find((v) => v.id === form.vehicleId) ?? VEHICLES[0]
  return {
    consumptionKwhPer100Km: vehicle.consumptionKwhPer100Km,
    chargePowerKw: vehicle.chargePower10To80Kw,
    batteryKwh: vehicle.batteryKwh,
  }
}

export default function App() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const inputs: TripInputs = useMemo(() => {
    const specs = resolveVehicleSpecs(form)
    return {
      distanceKm: form.distanceKm,
      targetSpeedKmh: form.targetSpeedKmh,
      consumptionKwhPer100Km: specs.consumptionKwhPer100Km,
      chargePowerKw: specs.chargePowerKw,
      batteryKwh: specs.batteryKwh,
      pricePerKwh: form.pricePerKwh,
      departureSoc: form.departureSocPct / 100,
      arrivalSoc: form.arrivalSocPct / 100,
      stopOverheadMin: form.stopOverheadMin,
    }
  }, [form])

  const targetResult = useMemo(() => evaluateTrip(inputs), [inputs])
  const sweep = useMemo(() => sweepSpeeds(inputs), [inputs])

  const valid = inputs.distanceKm > 0 && inputs.targetSpeedKmh > 0

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">⚡</span>
          <div>
            <h1>ChargeTripAnalyzer</h1>
            <p>
              Estimate the time and cost of an electric-car trip across a range
              of target speeds.
            </p>
          </div>
        </div>
      </header>

      <main className="layout">
        <TripForm form={form} update={update} />

        <div className="results">
          {valid ? (
            <>
              <section className="card">
                <h2>Your trip at {Math.round(form.targetSpeedKmh)} km/h</h2>
                <ResultSummary
                  result={targetResult}
                  distanceKm={inputs.distanceKm}
                />
              </section>

              <section className="card">
                <h2>Time &amp; cost vs. speed (±30%)</h2>
                <ResultChart
                  results={sweep}
                  targetSpeedKmh={form.targetSpeedKmh}
                />
                <p className="chart-caption">
                  Faster driving cuts time on the road but raises consumption
                  (drag grows with speed²), which means more energy, higher cost
                  and longer charging. The total-time curve shows the real
                  tradeoff.
                </p>
              </section>
            </>
          ) : (
            <section className="card">
              <p className="note">
                Enter a distance and target speed to see results.
              </p>
            </section>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Estimates only. Real-world results depend on weather, traffic,
          terrain, payload and charger availability. Distances via OpenStreetMap
          / OSRM.
        </p>
      </footer>
    </div>
  )
}
