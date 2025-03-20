import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface BarChartProps {
  data: {
    name: string;
    value: number;
  }[];
  xAxisKey: string;
  yAxisKey: string;
  height?: number;
}

export function BarChart({ data, xAxisKey, yAxisKey, height = 400 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey={xAxisKey}
          axisLine={true}
          tickLine={true}
        />
        <YAxis 
          domain={[0, 180]}
          ticks={[0, 45, 90, 135, 180]}
          axisLine={true}
          tickLine={true}
        />
        <Tooltip />
        <Bar dataKey={yAxisKey} fill="#8884d8" radius={[4, 4, 0, 0]} maxBarSize={50} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 