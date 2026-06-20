const eur = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
})

export function formatEur(value: number): string {
  return eur.format(value)
}

/** Format a duration given in hours as e.g. "3 h 45 min". */
export function formatHours(hours: number): string {
  const totalMinutes = Math.round(hours * 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h <= 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}

export function formatNumber(value: number, fractionDigits = 1): string {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}
