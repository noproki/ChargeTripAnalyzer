export interface GeocodeResult {
  displayName: string
  lat: number
  lon: number
}

export interface RouteResult {
  start: GeocodeResult
  destination: GeocodeResult
  /** Driving distance in km. */
  distanceKm: number
  /** Estimated driving duration in hours (from the routing engine). */
  durationHours: number
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving'

interface NominatimEntry {
  display_name: string
  lat: string
  lon: string
}

/** Geocode a free-text place name to coordinates using OpenStreetMap Nominatim. */
export async function geocode(query: string): Promise<GeocodeResult> {
  const trimmed = query.trim()
  if (!trimmed) {
    throw new Error('Please enter a location.')
  }

  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(
    trimmed,
  )}&format=json&limit=1`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`Geocoding failed (HTTP ${res.status}).`)
  }

  const data = (await res.json()) as NominatimEntry[]
  if (!data.length) {
    throw new Error(`No location found for "${trimmed}".`)
  }

  const [first] = data
  return {
    displayName: first.display_name,
    lat: Number(first.lat),
    lon: Number(first.lon),
  }
}

interface OsrmResponse {
  code: string
  routes?: Array<{ distance: number; duration: number }>
}

/** Look up the driving distance and duration between two coordinates via OSRM. */
async function route(
  start: GeocodeResult,
  destination: GeocodeResult,
): Promise<{ distanceKm: number; durationHours: number }> {
  const coords = `${start.lon},${start.lat};${destination.lon},${destination.lat}`
  const url = `${OSRM_URL}/${coords}?overview=false`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Routing failed (HTTP ${res.status}).`)
  }

  const data = (await res.json()) as OsrmResponse
  const best = data.routes?.[0]
  if (data.code !== 'Ok' || !best) {
    throw new Error('No driving route found between these locations.')
  }

  return {
    distanceKm: best.distance / 1000,
    durationHours: best.duration / 3600,
  }
}

/**
 * Resolve two place names into a driving route. Geocoding is done sequentially
 * to respect the Nominatim usage policy (max ~1 request/second).
 */
export async function getRoute(
  startQuery: string,
  destinationQuery: string,
): Promise<RouteResult> {
  const start = await geocode(startQuery)
  const destination = await geocode(destinationQuery)
  const { distanceKm, durationHours } = await route(start, destination)
  return { start, destination, distanceKm, durationHours }
}
