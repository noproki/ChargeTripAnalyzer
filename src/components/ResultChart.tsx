import {
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TripResult } from '../types'
import { formatEur, formatHours, formatNumber } from '../lib/format'

interface ResultChartProps {
  results: TripResult[]
  targetSpeedKmh: number
}

interface ChartPoint {
  speed: number
  totalHours: number
  drivingHours: number
  costEur: number
}

const TIME_COLOR = '#2563eb'
const DRIVE_COLOR = '#93c5fd'
const COST_COLOR = '#16a34a'

export function ResultChart({ results, targetSpeedKmh }: ResultChartProps) {
  const data: ChartPoint[] = results.map((r) => ({
    speed: Math.round(r.speedKmh),
    totalHours: r.totalHours,
    drivingHours: r.drivingHours,
    costEur: r.costEur,
  }))

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart
          data={data}
          margin={{ top: 16, right: 24, bottom: 28, left: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="speed"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickCount={7}
            label={{
              value: 'Average speed (km/h)',
              position: 'insideBottom',
              offset: -16,
            }}
          />
          <YAxis
            yAxisId="time"
            tickFormatter={(v: number) => `${formatNumber(v, 1)}h`}
            label={{
              value: 'Travel time',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' },
            }}
          />
          <YAxis
            yAxisId="cost"
            orientation="right"
            tickFormatter={(v: number) => `€${formatNumber(v, 0)}`}
            label={{
              value: 'Cost',
              angle: 90,
              position: 'insideRight',
              style: { textAnchor: 'middle' },
            }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === 'Total travel time' || name === 'Driving only') {
                return [formatHours(value), name]
              }
              return [formatEur(value), name]
            }}
            labelFormatter={(label: number) => `${label} km/h`}
          />
          <Legend verticalAlign="top" height={36} />
          <ReferenceLine
            yAxisId="time"
            x={Math.round(targetSpeedKmh)}
            stroke="#9ca3af"
            strokeDasharray="4 4"
            label={{ value: 'target', position: 'top', fill: '#6b7280' }}
          />
          <Line
            yAxisId="time"
            type="monotone"
            dataKey="totalHours"
            name="Total travel time"
            stroke={TIME_COLOR}
            strokeWidth={3}
            dot={false}
          />
          <Line
            yAxisId="time"
            type="monotone"
            dataKey="drivingHours"
            name="Driving only"
            stroke={DRIVE_COLOR}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
          />
          <Line
            yAxisId="cost"
            type="monotone"
            dataKey="costEur"
            name="Energy cost"
            stroke={COST_COLOR}
            strokeWidth={3}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
