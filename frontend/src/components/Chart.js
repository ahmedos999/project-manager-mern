
import { PieChart, Pie, Cell, } from 'recharts';
import { useTaskContext } from '../hooks/useTaskContext';
import { useEffect, useState } from 'react';




  const COLORS = ['#f87171', '#facc15', '#60a5fa', '#4ade80'];
export const Chart = ()=>{
    const [data,setData] = useState([
        { name: 'urgent', value: 0 },
        { name: 'progress', value: 0 },
        { name: 'long', value: 0 },
        { name: 'done', value: 0 },
      ])

    const {tasks} = useTaskContext()
    useEffect(()=>{
      const newData = [
        { name: 'urgent', value: 0 },
        { name: 'progress', value: 0 },
        { name: 'long', value: 0 },
        { name: 'done', value: 0 },
      ];
  
      if (tasks && tasks.length !== 0) {
        tasks.forEach(task => {
          switch (task.status) {
            case 'urgent': newData[0].value++; break;
            case 'progress': newData[1].value++; break;
            case 'long': newData[2].value++; break;
            case 'done': newData[3].value++; break;
            default: return;
          }
        });
      }
  
      setData(newData); 
    },[tasks])
    return(<div> 
        {tasks && tasks.length > 0 && <PieChart width={110} height={110} >
        <Pie
          data={data}
          cx={50}
          cy={50}
          innerRadius={40}
          outerRadius={50}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        </PieChart>}
    </div>)
}