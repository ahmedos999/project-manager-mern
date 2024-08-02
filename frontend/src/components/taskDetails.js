import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { useTaskContext } from "../hooks/useTaskContext";
import {useAuthContext} from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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

const urlApi = process.env.REACT_APP_API_URL
// const urlApi = 'http://localhost:4000'

const TaskDetails = ({task,isOpen,closeModol}) => {

  // const [modalOpen,setModalOpen] = useState(true)
  const [error,setError] = useState()
  const {dispatch} = useTaskContext()
  const {user} = useAuthContext()

  const deletetask = async()=>{


    if(task.user_email!==user.email){
      setError('Only task creater can Delete task')
      return
    }
    const response = await fetch(`${urlApi}/api/tasks/`+task._id,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json =  await response.json()

    if(!response.ok){
      setError(json.error)
    }
    dispatch({type:'DELETE_TASK',payload:json})
    closeModol()
  }

  const finishTask=async()=>{
    const response = await fetch(`${urlApi}/api/tasks/`+task._id,{
      method:'PATCH',
      body:JSON.stringify({status:'done'}),
      headers:{
        'Authorization':`Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const json =  await response.json()

    if(!response.ok){
      setError(json.error)
    }
    const newTask = {...task,status:'done'}
    dispatch({type:'UPDATE_TASK',payload:newTask})
    closeModol()
  }


    return (<div>
        <Modal
        isOpen={isOpen}
        onRequestClose={()=>closeModol()}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <div className="flex justify-between items-center teko"><div className="flex"><h2 className=" font-bold text-3xl">{task.title}</h2></div ><div className=" rounded-full bg-slate-600 p-1"><MdDelete className="text-red-500 text-xl" onClick={deletetask}/></div></div>
        
        <div className="my-2">
        <h2 className=" text-slate-200 text-sm font-bold">Description</h2>
        <p className=" bg-slate-500 p-1 rounded-sm text-slate-200  text-sm">{task.description}</p>
        </div>

        <div className="my-2">
          <h2 className=" text-slate-200 text-sm font-bold">Task Categories</h2>
          <div className="flex gap-1">
          {task.categories.map((category,index)=>(
                <div key={index} className={` rounded mr-1 flex justify-center items-center text-xs p-1 ${index%3===0?`bg-purple-500`:index%3===1?`bg-red-500`:`bg-blue-500`}`}>{category}</div>
            ))}
          </div>
        </div>

        <div className="my-2">
          <h2 className=" text-slate-200 text-sm font-bold">Task participants</h2>
          <div className="flex gap-1 flex-wrap text-slate-200">{task.participants.map((e,index)=>(<div key={index} className=" bg-slate-500 py-1 px-2 rounded text-xs">{e}</div>))}</div>
        </div>

        <div className="my-2">
          <h2 className="text-slate-200 text-sm font-bold">Created by</h2>
          <p className="text-sm text-slate-400">{task.user_email}</p>
        </div>


        {task.status !== 'done' && <button className=" bg-slate-700 p-1 rounded text-green-400 w-full shadow-md" onClick={finishTask}>Finish Task</button>}

        <div className="flex justify-end text-sm text-slate-400">{} {formatDistanceToNow(new Date(task.createdAt),{addSuffix:true})}</div>
        
        {error && <div className=" text-red-400">{error}</div>}
      </Modal>
    </div> );
}
 
export default TaskDetails;