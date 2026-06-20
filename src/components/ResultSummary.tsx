import type { TripResult } from '../types'
import { formatEur, formatHours, formatNumber } from '../lib/format'

interface ResultSummaryProps {
  result: TripResult
  distanceKm: number
}

export function ResultSummary({ result, distanceKm }: ResultSummaryProps) {
  const items: Array<{ label: string; value: string; primary?: boolean }> = [
    {
      label: `Total time @ ${Math.round(result.speedKmh)} km/h`,
      value: formatHours(result.totalHours),
      primary: true,
    },
    {
      label: 'Total cost',
      value: formatEur(result.costEur),
      primary: true,
    },
    { label: 'Driving time', value: formatHours(result.drivingHours) },
    { label: 'Charging time', value: formatHours(result.chargingHours) },
    {
      label: 'Charging stops',
      value: String(result.stops),
    },
    {
      label: 'Energy used',
      value: `${formatNumber(result.energyKwh)} kWh`,
    },
    {
      label: 'Consumption @ speed',
      value: `${formatNumber(result.consumptionKwhPer100Km)} kWh/100km`,
    },
    {
      label: 'Avg. speed incl. charging',
      value:
        result.totalHours > 0
          ? `${formatNumber(distanceKm / result.totalHours, 0)} km/h`
          : '–',
    },
  ]

  return (
    <div className="summary-grid">
      {items.map((item) => (
        <div
          key={item.label}
          className={`summary-card${item.primary ? ' primary' : ''}`}
        >
          <span className="summary-value">{item.value}</span>
          <span className="summary-label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
