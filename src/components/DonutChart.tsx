import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#22c55c', '#f87271', '#f9933d'];

export default function DonutChart({
  data,
}: {
  data: { name: string; value: number; percentage?: number }[];
}) {
  if (!data) return null;

  const sortedData = data.sort((a, b) => b.value - a.value);

  return (
    <div className='relative w-64 h-80'>
      <ResponsiveContainer className=''>
        <PieChart>
          <Pie
            className='relative'
            data={sortedData}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey='value'
          >
            {sortedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout='vertical'
            verticalAlign='bottom'
            align='center'
            formatter={(value, entry) => {
              return `${entry?.payload?.value} - ${value}`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {Boolean(data[0]?.percentage) && (
        <div className='absolute left-1/2 -translate-x-1/2 top-1/3 text-center -translate-y-1/4 flex flex-col items-center justify-center'>
          <span className='text-2xl font-bold text-[#055f46]'>
            {data[0]?.percentage?.toFixed(0)}%
          </span>
          <span className='text-sm text-[#055f46]'>Healthy</span>
        </div>
      )}
    </div>
  );
}
