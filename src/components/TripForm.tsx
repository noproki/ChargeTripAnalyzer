import { useState } from 'react'
import { VEHICLES } from '../data/vehicles'
import { getRoute } from '../lib/routing'
import { formatNumber } from '../lib/format'
import { NumberField } from './NumberField'
import type { FormState } from '../App'

interface TripFormProps {
  form: FormState
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
}

export function TripForm({ form, update }: TripFormProps) {
  const [routeLoading, setRouteLoading] = useState(false)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [routeNote, setRouteNote] = useState<string | null>(null)

  async function lookupRoute() {
    setRouteLoading(true)
    setRouteError(null)
    setRouteNote(null)
    try {
      const result = await getRoute(form.start, form.destination)
      update('distanceKm', Math.round(result.distanceKm * 10) / 10)
      setRouteNote(
        `${result.start.displayName.split(',')[0]} → ` +
          `${result.destination.displayName.split(',')[0]}: ` +
          `${formatNumber(result.distanceKm)} km by road`,
      )
    } catch (err) {
      setRouteError(
        err instanceof Error ? err.message : 'Could not look up the route.',
      )
    } finally {
      setRouteLoading(false)
    }
  }

  return (
    <form className="trip-form" onSubmit={(e) => e.preventDefault()}>
      <section className="card">
        <h2>Route</h2>
        <div className="field">
          <span className="field-label">Start</span>
          <span className="field-input">
            <input
              type="text"
              placeholder="e.g. Munich"
              value={form.start}
              onChange={(e) => update('start', e.target.value)}
            />
          </span>
        </div>
        <div className="field">
          <span className="field-label">Destination</span>
          <span className="field-input">
            <input
              type="text"
              placeholder="e.g. Berlin"
              value={form.destination}
              onChange={(e) => update('destination', e.target.value)}
            />
          </span>
        </div>
        <button
          type="button"
          className="secondary"
          onClick={lookupRoute}
          disabled={routeLoading || !form.start.trim() || !form.destination.trim()}
        >
          {routeLoading ? 'Looking up…' : 'Look up driving distance'}
        </button>
        {routeNote && <p className="note success">{routeNote}</p>}
        {routeError && <p className="note error">{routeError}</p>}

        <NumberField
          id="distance"
          label="Distance"
          value={form.distanceKm}
          onChange={(v) => update('distanceKm', v)}
          unit="km"
          min={1}
          step={1}
          hint="Auto-filled from the lookup, or enter it manually."
        />
        <NumberField
          id="speed"
          label="Target average speed"
          value={form.targetSpeedKmh}
          onChange={(v) => update('targetSpeedKmh', v)}
          unit="km/h"
          min={20}
          max={250}
          step={5}
          hint="The chart sweeps this ±30%."
        />
      </section>

      <section className="card">
        <h2>Vehicle</h2>
        <div className="mode-toggle" role="tablist" aria-label="Vehicle input mode">
          <button
            type="button"
            role="tab"
            aria-selected={form.mode === 'vehicle'}
            className={form.mode === 'vehicle' ? 'active' : ''}
            onClick={() => update('mode', 'vehicle')}
          >
            Pick a vehicle
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={form.mode === 'manual'}
            className={form.mode === 'manual' ? 'active' : ''}
            onClick={() => update('mode', 'manual')}
          >
            Enter manually
          </button>
        </div>

        {form.mode === 'vehicle' ? (
          <>
            <div className="field">
              <span className="field-label">Model</span>
              <span className="field-input">
                <select
                  value={form.vehicleId}
                  onChange={(e) => update('vehicleId', e.target.value)}
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </span>
              <span className="field-hint">
                Consumption &amp; 10–80% charging power are filled in
                automatically. Switch to manual to override.
              </span>
            </div>
            <VehicleSpecs vehicleId={form.vehicleId} />
          </>
        ) : (
          <>
            <NumberField
              id="consumption"
              label="Consumption"
              value={form.manualConsumption}
              onChange={(v) => update('manualConsumption', v)}
              unit="kWh/100km"
              min={5}
              max={50}
              step={0.5}
            />
            <NumberField
              id="charge-power"
              label="Avg. charging power (10–80%)"
              value={form.manualChargePower}
              onChange={(v) => update('manualChargePower', v)}
              unit="kW"
              min={3}
              max={400}
              step={5}
            />
            <NumberField
              id="battery"
              label="Usable battery capacity"
              value={form.manualBattery}
              onChange={(v) => update('manualBattery', v)}
              unit="kWh"
              min={10}
              max={200}
              step={1}
            />
          </>
        )}
      </section>

      <section className="card">
        <h2>Charging &amp; cost</h2>
        <NumberField
          id="price"
          label="Electricity price"
          value={form.pricePerKwh}
          onChange={(v) => update('pricePerKwh', v)}
          unit="€/kWh"
          min={0}
          max={2}
          step={0.01}
        />
        <NumberField
          id="depart-soc"
          label="Charge at departure"
          value={form.departureSocPct}
          onChange={(v) => update('departureSocPct', v)}
          unit="%"
          min={0}
          max={100}
          step={5}
          hint="How full the battery is when you set off."
        />
        <NumberField
          id="arrive-soc"
          label="Reserve / arrival charge"
          value={form.arrivalSocPct}
          onChange={(v) => update('arrivalSocPct', v)}
          unit="%"
          min={0}
          max={50}
          step={5}
          hint="Buffer you keep before charging again."
        />
        <NumberField
          id="overhead"
          label="Overhead per charging stop"
          value={form.stopOverheadMin}
          onChange={(v) => update('stopOverheadMin', v)}
          unit="min"
          min={0}
          max={30}
          step={1}
          hint="Time to exit, plug in and resume per stop."
        />
      </section>
    </form>
  )
}

function VehicleSpecs({ vehicleId }: { vehicleId: string }) {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId)
  if (!vehicle) return null
  return (
    <dl className="specs">
      <div>
        <dt>Battery</dt>
        <dd>{formatNumber(vehicle.batteryKwh, 0)} kWh</dd>
      </div>
      <div>
        <dt>Consumption</dt>
        <dd>{formatNumber(vehicle.consumptionKwhPer100Km)} kWh/100km</dd>
      </div>
      <div>
        <dt>Charge 10–80%</dt>
        <dd>{formatNumber(vehicle.chargePower10To80Kw, 0)} kW</dd>
      </div>
    </dl>
  )
}
