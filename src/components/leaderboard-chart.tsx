'use client';

import type { LeaderboardEntry } from '@/lib/types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type LeaderboardChartProps = {
  data: LeaderboardEntry[];
  mode?: 'pages' | 'books';
};

export default function LeaderboardChart({
  data,
  mode = 'pages',
}: LeaderboardChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="childName"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
              background: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend />
          {mode === 'pages' && (
            <Bar
              dataKey="totalPages"
              name="Total Pages"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          )}
          {mode === 'books' && (
            <Bar
              dataKey="totalBooks"
              name="Total Books"
              fill="hsl(var(--yellow))"
              radius={[4, 4, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}