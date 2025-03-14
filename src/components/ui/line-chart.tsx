import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface LineChartProps {
  data: {
    name: string;
    value: number;
  }[];
  xAxisKey: string;
  yAxisKey: string;
  height?: number;
}

export function LineChart({ data, xAxisKey, yAxisKey, height = 400 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
} 