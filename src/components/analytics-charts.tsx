"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#1a2c4d', '#2c4b82', '#3d6ab8', '#4f88ed', '#8ab1f5', '#c4d8fa'];

export function TimeSeriesChart({ data }: { data: { date: string, count: number }[] }) {
  // Format date for display
  const formattedData = data.map(d => {
    const [, month, day] = d.date.split('-');
    return {
      ...d,
      displayDate: `${month}/${day}`
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="displayDate" 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            tickMargin={10}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }} 
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          />
          <Bar dataKey="count" fill="#1a2c4d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ServicePieChart({ data }: { data: { service: string, count: number }[] }) {
  if (!data || data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-sm text-[var(--ink-soft)]">No data available</div>;
  }

  const formatService = (val: string) => val.replaceAll("-", " ").replace(/\b\w/g, l => l.toUpperCase());
  
  const formattedData = data.map(d => ({
    name: formatService(d.service),
    value: d.count
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
