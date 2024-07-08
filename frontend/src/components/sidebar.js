import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTaskContext } from '../hooks/useTaskContext';


const SideBar = () => {
    const {user,dispatch} = useAuthContext()
    const {tasks,dispatch:dispatchTask} = useTaskContext()
    const [categories,setCategories] = useState([])
    const [flag,setFlag] = useState(true)
    const [allTasks,setAllTasks] = useState([])
    const [filterList, setFilterList] = useState([]);
    
    


    const addFilter = (filter)=>{
        if(filterList.includes(filter)){
            const index = filterList.indexOf(filter)
            filterList.splice(index,1)
            setFilterList([...filterList])
            filterTasks(filterList)
            return
        }
        setFilterList(prevFilterList => [...prevFilterList, filter]);
        filterTasks([...filterList, filter]);
    }
    const filterTasks =(updatedFilterList)=>{
        console.log(updatedFilterList)
        setFlag(false)
        var filter = allTasks.filter((task) => {
            return task.categories.some(cate => updatedFilterList.includes(cate));
        });
        if(filter.length===0) filter = allTasks
        dispatchTask({type:'SET_TASKS',payload:filter})
    }
    useEffect(()=>{
        
        if(flag && tasks){
            let uniqueTags = []
            tasks.forEach(element => {
                element.categories.forEach(cate=>{
                    if(!uniqueTags.includes(cate)) uniqueTags.push(cate)
                })
            });
            setCategories(uniqueTags)
            setAllTasks(tasks)
        }
        
        
    },[tasks,flag])

    const logout =()=>{
        localStorage.removeItem('user')
        setCategories(null)
        setFilterList(null)
        dispatch({type:'LOGOUT'})
    }
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center mt-8">
            <div className="w-14 h-14 mr-2 bg-slate-600 rounded-full flex justify-center items-center text-3xl">{user.email.substring(0,1).toUpperCase()}</div>
            <h2 className="">{user.email.substring(0,(user.email.indexOf('@')))}</h2>
        </div>
        <div className='flex gap-1 flex-wrap'>
        {categories && categories.map((category,index)=>(<div className='my-1' key={index} onClick={()=>addFilter(category)} > <p className={`p-1 rounded-full w-min text-sm${filterList.includes(category)?` bg-red-400`:` bg-slate-500`}`}>{category}</p></div>))}
        </div>
        <button onClick={logout} className='font-bold self-start rounded p-1 bg-gray-800'>
            Logout
        </button>
    </div> );
}
 
export default SideBar;