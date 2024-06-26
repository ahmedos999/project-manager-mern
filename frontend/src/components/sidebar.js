import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';


const SideBar = () => {
    const {user,dispatch} = useAuthContext()
    const {tasks,dispatch:dispatchTask} = useTaskContext()
    const [categories,setCategories] = useState([])
    const [flag,setFlag] = useState(true)
    

    const filterTasks =(categoryFilter)=>{
        setFlag(false)
        const filter = tasks.filter((task)=>task.category===categoryFilter)
        dispatchTask({type:'SET_TASKS',payload:filter})
    }
    useEffect(()=>{
        if(flag)
        setCategories(tasks)
        
    },[tasks,flag])

    const logout =()=>{
        localStorage.removeItem('user')
        setCategories(null)
        dispatch({type:'LOGOUT'})
    }
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center mt-8">
            <div className="w-14 h-14 mr-2 bg-slate-600 rounded-full flex justify-center items-center text-3xl">{user.email.substring(0,1).toUpperCase()}</div>
            <h2 className="">{user.email.substring(0,(user.email.indexOf('@')))}</h2>
        </div>
        <div>
        {categories && categories.map((task)=>(<div key={task._id} onClick={()=>filterTasks(task.category)} >{task.category}</div>))}
        </div>
        <button onClick={logout} className='font-bold self-start rounded p-1 bg-gray-800'>
            Logout
        </button>
    </div> );
}
 
export default SideBar;