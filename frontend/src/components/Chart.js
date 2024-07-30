
import { PieChart, Pie, Cell, } from 'recharts';
import { useTaskContext } from '../hooks/useTaskContext';
import { useEffect, useState } from 'react';




  const COLORS = ['#f87171', '#facc15', '#60a5fa', '#4ade80'];
export const Chart = ()=>{
    const [data,setData] = useState([
        { name: 'Group A', value: 0 },
        { name: 'Group B', value: 0 },
        { name: 'Group C', value: 0 },
        { name: 'Group D', value: 0 },
      ])

    const {tasks} = useTaskContext()
    useEffect(()=>{
        if(tasks && tasks.length!==0){
            tasks.forEach(task => {
                switch(task.status){
                    case 'urgent':data[0].value++;break;
                    case 'progress':data[1].value++;break;
                    case 'long':data[2].value++;break;
                    case 'done':data[3].value++;break;
                    default:return
                }
            });
        }
        setData([...data])
    },[data,tasks])
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