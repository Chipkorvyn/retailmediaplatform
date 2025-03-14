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
        layout="vertical"
        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
        <XAxis type="number" domain={[0, 5]} />
        <YAxis dataKey={xAxisKey} type="category" width={90} />
        <Tooltip />
        <Bar dataKey={yAxisKey} fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
} 