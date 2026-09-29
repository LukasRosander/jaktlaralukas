import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { WeeklyPoint } from '@/types'

/** Weekly accuracy trend. Kept presentational so any data source can feed it. */
export function ProgressChart({ data }: { data: WeeklyPoint[] }) {
  const hasData = data.some((point) => point.answered > 0)

  if (!hasData) {
    return (
      <div className="text-ink-400 flex h-56 items-center justify-center text-sm">
        Svara på frågor för att se din utveckling här.
      </div>
    )
  }

  return (
    <div className="h-56 w-full sm:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="accuracyFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f6b41" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#2f6b41" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e8e2d5" strokeDasharray="4 6" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6f7a74', fontSize: 12 }}
            tickFormatter={(label: string) => label.replace('Vecka ', 'V')}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6f7a74', fontSize: 12 }}
            tickFormatter={(value: number) => `${value}%`}
          />
          <Tooltip
            cursor={{ stroke: '#adc9b4', strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 14,
              border: '1px solid #e8e2d5',
              boxShadow: '0 12px 32px -18px rgba(20,51,31,0.35)',
              fontSize: 13,
            }}
            labelStyle={{ color: '#1a1d1b', fontWeight: 600 }}
            formatter={(value, _name, item) => {
              const point = item?.payload as WeeklyPoint | undefined
              return [`${value} % rätt av ${point?.answered ?? 0} frågor`, 'Resultat']
            }}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke="#2f6b41"
            strokeWidth={2.5}
            fill="url(#accuracyFill)"
            dot={{ r: 4, fill: '#ffffff', stroke: '#2f6b41', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#2f6b41', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
