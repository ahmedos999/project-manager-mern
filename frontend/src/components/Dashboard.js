import { useEffect, useState } from "react";
import Card from "./Card";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "react-modal";
import { MdAddToPhotos } from "react-icons/md";
import TaskDetails from "./taskDetails";
import { useTaskContext } from "../hooks/useTaskContext";
import {useAuthContext} from '../hooks/useAuthContext'
import { IoIosNotifications } from "react-icons/io";

// const socket = io('http://localhost:3000');

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
    const [taskmodelopen,setTaskmodelopen] = useState(false)

    const openModel = ()=>setTaskmodelopen(true)
    const closeTaskModel = ()=>setTaskmodelopen(false)


    const [openNotifications,setOpenNotifications] = useState(false)
    const [unReadNotificationCount,setUnReadNotificationCount] = useState(0)

    const [searchTerm,setSearchTerm] = useState('')
    

    const toggleDropdown = ()=>{
        setOpenNotifications(!openNotifications)
        if(openNotifications){
            markasRead()
        }
        
    }



    const [participants,setParticipants] = useState([])
    const [users,setUsers] = useState([])

    const [notification,setNotification] = useState([])

    const [status,setStatus] = useState('long')
    const openTaskModal = (task)=>{
        openModel()
        setCurrentTask(task)
    }
    const handleUserSelection = (e)=>{
        const selectedIndex = e.target.options.selectedIndex;
        console.log(users[selectedIndex])
        if(!participants.includes(users[selectedIndex]))
        setParticipants([...participants,users[selectedIndex]])
    }
    const removeUser = (name)=>{
        const index = participants.indexOf(name)
        participants.splice(index,1)
        setParticipants([...participants])
    }
    const addcategory = ()=>{
        if(categories.includes(category))return

        setcategories(prevCategories=>[...prevCategories,category])
        setCategory('')
    }

    const removeCategory = (cate)=>{
        const index = categories.indexOf(cate)
        categories.splice(index,1)
        setcategories([...categories])
    }

    const addNotification = async(user_id,project,owner)=>{

        const response = await fetch('/api/notification',{
            method:'POST',
            body:JSON.stringify({user_id,project,owner}),
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${user.token}`
                  
            }
        })

        if(response.ok){
            console.log('notification added to '+user_id)
        }
        
    }

    const markasRead = async()=>{
        const response = await fetch('/api/notification',{
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${user.token}`
                  
            }
        })

        if(response.ok){
            console.log(response)
            setUnReadNotificationCount(0)
        }

    }

    const handleSumbit = async()=>{
        if(!user) {
            setError('You Must be logged in')
            return
        }
        const participantsEmails = participants.map((p)=>p.email)
        console.log(participantsEmails)
        const task = {title:title.trim(),description:description.trim(),categories:categories,user_email:user.email,participants:participantsEmails,status}
        // console.log(participants)
        console.log(task)
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
            setTitle('')
            setDescription('')
            setcategories([])
            setModalOpen(false)
            dispatch({type:'CREATE_TASK',payload:json})

            participants.map((participant)=>{
               return addNotification(participant._id+'',title,user.email.substring(0,(user.email.indexOf('@'))))
            })
        }

        if(!response.ok){
            setError(json.error)
        }
    }

    const [modalOpen, setModalOpen] = useState(false);


    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [categories,setcategories] = useState([])

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
                dispatch({type:'SET_ALL_TASKS',payload:json})
            }
        }

        const fetchUsers = async()=>{
            const res = await fetch('/api/user/allusers')

            const json = await res.json()

            if(res.ok){
                setUsers(json)
                
            }
        }

        const fetchNOtifications = async()=>{
            const res = await fetch('/api/notification',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })

            const json = await res.json()

            if(res.ok){
                let count = 0
                json.forEach((e)=>{
                    if(!e.isRead)
                        count++
                })
                setUnReadNotificationCount(count)
                setNotification(json)
                
            }
        }

        fetchTasks()
        fetchUsers()
        fetchNOtifications()
        
    },[dispatch,user])

    return ( <div className="p-2 ">
        
        <div className="flex items-center">
        <input type="text" value={searchTerm
        } onChange={(e)=>setSearchTerm(e.target.value)} className="w-full m-4 rounded-full p-2 bg-slate-400 text-gray-100 placeholder:text-gray-100 border-gray-600 border-4" placeholder="Search here ..."/>


        <div className="relative inline-block text-left">
      <div>

          <IoIosNotifications className=" text-white text-3xl hover:cursor-pointer ml-4 relative" onClick={toggleDropdown}/>
          {unReadNotificationCount>0 && <div className=" absolute top-0 right-0 text-xs bg-red-600 rounded-full flex justify-center items-center w-4 h-4">{unReadNotificationCount}</div>}
        
      </div>

      {openNotifications && 
    
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
            {notification.map((notification)=>(<div key={notification._id} className={`flex border-b my-1 p-1 rounded items-center ${notification.isRead? 'bg-white':'bg-slate-300'}`} >
            <div className=" rounded-full bg-slate-600 flex justify-center items-center w-10 h-10 ">{notification.owner[0].toUpperCase()}</div>
            <p className="p-2 text-slate-700 text-sm">{notification.owner} added you to {notification.project} </p></div>))}
        </div>
    
      }
    </div>
        </div>
        
        <h2 className=" text-4xl font-bold teko">Task Boards</h2>

        <div className="grid grid-cols-4 gap-2 custom-scrollbar">
           <div> 
            <p className=" text-center text-red-400 font-bold">urgent</p>
            {
                tasks && tasks.map((task)=>(
                    <div key={task._id}>  { task.status === 'urgent' && task.title.includes(searchTerm) && <div onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div>} </div>
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>{setModalOpen(true);setStatus('urgent')}}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>
            {/* second task list */}
            <div> 
            <p className=" text-center text-yellow-400 font-bold">In progress</p>
            {
                tasks && tasks.map((task)=>(
                    <div key={task._id}>  { task.status === 'progress' && task.title.includes(searchTerm) && <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div>} </div>
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>{setModalOpen(true);setStatus('progress')}}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>

            {/* third task list */}
            <div> 
            <p className=" text-center text-blue-400 font-bold">Long term</p>
            {
                tasks && tasks.map((task)=>(
                  <div key={task._id}>  { task.status === 'long' && task.title.includes(searchTerm) && <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div>} </div>
                ))
            } 
            <div className="m-2 rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>{setModalOpen(true);setStatus('long')}}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            </div>

            {/* forth task list */}
            <div> 
            <p className=" text-center text-green-400 font-bold">Finished</p>
            {
                tasks && tasks.map((task)=>(
                    <div key={task._id}>  { task.status === 'done' && task.title.includes(searchTerm) && <div key={task._id} onClick={()=>openTaskModal(task)}><Card task={task} ></Card></div>} </div>
                ))
            } 
            
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
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="here the name of your task" onChange={(e)=>setTitle(e.target.value)} value={title} />
        <label className="text-sm">Task Description</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Descripe your task here" onChange={(e)=>setDescription(e.target.value)} value={description}/>
        <label className="text-sm">Task Category</label>
        <div className="flex gap-2">
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm text-gray-900" placeholder="Add your task categories here" onChange={(e)=>setCategory(e.target.value)} value={category} />
        <button className="p-1 bg-slate-500 rounded text-sm h-8" onClick={addcategory}>Add</button>
        </div>

        <div className="flex flex-wrap">
            {categories.map((cate,index)=>(<p key={index} className="text-xs my-2 mx-1 py-1 px-2 rounded-full bg-slate-500" onClick={()=>removeCategory(cate)}>{cate}</p>))}
                
            </div>

        <label className="text-sm block">Add users to task</label>
        <select name="allusers" id="users" className="w-full" onChange={(e)=>handleUserSelection(e)}>
            {users.map((e)=>(
                <option key={e._id}>{e.email}</option>
            ))}
        </select>

        <div className="flex flex-wrap">
            {participants.map((e,index)=>(<p key={index} className="text-xs my-2 mx-1 py-1 px-2 rounded-full bg-slate-500" onClick={()=>removeUser(e)}>{e.email}</p>))}
                
            </div>
        <div className="flex justify-center mt-4"><button className=" bg-slate-600 py-2 px-8 rounded hover:bg-slate-700 mt-2" onClick={handleSumbit}>Add Task</button></div>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      </Modal>
      {currentTask && taskmodelopen && <TaskDetails task={currentTask} isOpen={taskmodelopen} closeModol={closeTaskModel}></TaskDetails>}
    </div> );
}
 
export default Dashboard;