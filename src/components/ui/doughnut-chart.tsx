import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LabelList } from 'recharts';

interface DoughnutChartProps {
  data: {
    name: string;
    value: number;
  }[];
  height?: number;
}

const COLORS = {
  'US': '#0088FE',      // Blue
  'China': '#00C49F',   // Teal
  'Europe': '#FFBB28',  // Yellow
  'RoW': '#FF8042'      // Orange
};

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value, fill } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* Label line */}
      <path
        d={`M${cx + (outerRadius + 10) * cos},${cy + (outerRadius + 10) * sin}L${cx + radius * cos},${cy + radius * sin}`}
        stroke={fill}
        fill="none"
      />
      {/* Label text */}
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={textAnchor}
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {`${name}: ${value}%`}
      </text>
    </g>
  );
};

export function DoughnutChart({ data, height = 400 }: DoughnutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry) => (
            <Cell 
              key={`cell-${entry.name}`} 
              fill={COLORS[entry.name as keyof typeof COLORS] || '#000000'} 
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
} 