import { useEffect, useState } from "react";
import Card from "./Card";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "react-modal";
import { MdAddToPhotos } from "react-icons/md";
import TaskDetails from "./taskDetails";
import { useTaskContext } from "../hooks/useTaskContext";
import {useAuthContext} from '../hooks/useAuthContext'

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#252322",
      width: 400,
    },
  }; 
const Dashboard = () => {

    const [currentTask,setCurrentTask] = useState()
    const {tasks,dispatch} = useTaskContext()
    const {user} = useAuthContext()

    const [participants,setParticipants] = useState([])
    const [users,setUsers] = useState([])
    const openTaskModal = (task)=>{
        console.log('run')
        setCurrentTask(task)
    }
    const handleUserSelection = (e)=>{
        if(!participants.includes(e.target.value))
        setParticipants([...participants,e.target.value])
    }
    const removeUser = (name)=>{
        const index = participants.indexOf(name)
        participants.splice(index,1)
        setParticipants([...participants])
    }

    const handleSumbit = async()=>{
        if(!user) {
            setError('You Must be logged in')
            return
        }

        const task = {title:title.trim(),description:description.trim(),category:category.trim(),participants}
        const response = await fetch('/api/tasks',{
            method:'POST',
            body:JSON.stringify(task),
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${user.token}`
                  
            }
        })

        const json = await response.json()

        if(response.ok){
            setName('')
            setDescription('')
            setCategory('')
            setModalOpen(false)
            dispatch({type:'CREATE_TASK',payload:json})
        }

        if(!response.ok){
            setError(json.error)
        }
    }

    const [modalOpen, setModalOpen] = useState(false);


    const [title,setName] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')

    const [error,setError] = useState()

    useEffect(()=>{
        const fetchTasks = async()=>{
            const response = await fetch('/api/tasks',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_TASKS',payload:json})
            }
        }

        const fetchUsers = async()=>{
            const res = await fetch('/api/user/allusers')

            const json = await res.json()

            if(res.ok){
                setUsers(json)
                
            }
        }

        fetchTasks()
        fetchUsers()
        
    },[dispatch,user])

    return ( <div className="p-2 ">
        
        <input type="text" className="w-full m-4 rounded-full p-2 bg-slate-400 text-gray-100 placeholder:text-gray-100 border-gray-600 border-4" placeholder="Search here ..."/>
        
        <h2 className=" text-4xl font-bold teko">Task Boards</h2>
        <h4 className=" text-lg font-semibold">Facebook</h4>

        <div className="grid grid-cols-4 gap-2 custom-scrollbar">
           <div> 
            <p className=" text-center">Urget</p>
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div> 
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>
            {/* second task list */}
            <div> 
            <p className=" text-center">In progress</p>
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div> 
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>

            {/* third task list */}
            <div> 
            <p className=" text-center">Long term</p>
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div> 
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>

            {/* forth task list */}
            <div> 
            <p className=" text-center">Delayed</p>
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div> 
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>
            
            
        
            
        </div>
        <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <div className="flex justify-between"><h2 className="text-3xl font-bold teko mb-8">Add a new Task</h2><MdAddToPhotos className="text-2xl"></MdAddToPhotos></div>
        <label className="text-sm">Task Title</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="here the name of your task" onChange={(e)=>setName(e.target.value)} value={title} />
        <label className="text-sm">Task Description</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Descripe your task here" onChange={(e)=>setDescription(e.target.value)} value={description}/>
        <label className="text-sm">Task Category</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Add your task categories here" onChange={(e)=>setCategory(e.target.value)} value={category} />

        <label className="text-sm block">Add users to task</label>
        <select name="allusers" id="users" className="w-full" onChange={(e)=>handleUserSelection(e)}>
            {users.map((e)=>(
                <option key={e._id}>{e.email}</option>
            ))}
        </select>

        <div className="flex flex-wrap">
            {participants.map((e,index)=>(<p key={index} className="text-xs my-2 mx-1 py-1 px-2 rounded-full bg-slate-500" onClick={()=>removeUser(e)}>{e}</p>))}
                
            </div>
        <div className="flex justify-center mt-4"><button className=" bg-slate-600 py-2 px-8 rounded hover:bg-slate-700 mt-2" onClick={handleSumbit}>Add Task</button></div>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      </Modal>
      {currentTask && <TaskDetails task={currentTask}></TaskDetails>}
    </div> );
}
 
export default Dashboard;