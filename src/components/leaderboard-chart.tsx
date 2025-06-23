'use client';

import type { LeaderboardEntry } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LeaderboardChartProps {
    data: LeaderboardEntry[];
}

export default function LeaderboardChart({ data }: LeaderboardChartProps) {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
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
                        cursor={{fill: 'hsl(var(--muted))'}}
                        contentStyle={{ 
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="totalPages" name="Total Pages" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="totalBooks" name="Total Books" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
