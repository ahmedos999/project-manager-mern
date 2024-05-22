import { useEffect, useState } from "react";
import Card from "./Card";
import { IoIosAddCircle } from "react-icons/io";


const Dashboard = () => {

    const [tasks,setTasks] = useState([])

    useEffect(()=>{
        const fetchTasks = async()=>{
            const response = await fetch('/api/tasks')
            const json = await response.json()

            if(response.ok){
                setTasks(json)
                console.log(json)
            }
        }
        fetchTasks()
        
    },[])

    return ( <div className="p-2 ">
        
        <input type="text" className="w-full m-4 rounded-full p-2 bg-slate-400 text-gray-100 placeholder:text-gray-100 border-gray-600 border-4" placeholder="Search here ..."/>
        
        <h2 className=" text-3xl font-bold">Task Boards</h2>
        <h4 className=" text-lg font-semibold">Facebook</h4>

        <div className="grid grid-cols-4 gap-2 custom-scrollbar auto-rows-min">
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id}><Card task={task}></Card></div> 
                ))
            }
            
            <div className="rounded-md bg-gray-900 hover:bg-slate-800 shadow-md p-4 cursor-pointer flex justify-center items-center">
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            
        
            
        </div>
    </div> );
}
 
export default Dashboard;