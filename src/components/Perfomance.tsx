"use client"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Image from 'next/image';


const data = [
  { name: 'Group A', value: 92, fill: "#00ad08" },
  { name: 'Group B', value: 8, fill: "#ff0000" },
];

const Perfomance = () => {
  return (
    <div className='bg-white p-4 rounded-md h-80 relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Performance</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
            // label
          />
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
      <h1 className='text-3xl font-bold'>9.2</h1>
      <p className='text-xs text-gray-300'>of 10 max</p>
      </div>
      <h2 className='font-medium absolute bottom-6 left-0 right-0 m-auto text-center'>
        1st Semester - 2nd Semester
      </h2>
    </div>
  )
}

export default Perfomance
