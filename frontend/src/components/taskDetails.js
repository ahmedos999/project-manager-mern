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

const TaskDetails = ({task,isOpen,closeModol}) => {

  // const [modalOpen,setModalOpen] = useState(true)
  const [error,setError] = useState()
  const {dispatch} = useTaskContext()
  const {user} = useAuthContext()

  const deletetask = async()=>{
    const response = await fetch('api/tasks/'+task.task._id,{
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


    return (<div>
        <Modal
        isOpen={isOpen}
        onRequestClose={()=>closeModol()}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <div className="flex justify-between items-center"><div className="flex"><h2 className=" font-bold text-xl">{task.title}</h2></div ><div className=" rounded-full bg-slate-600 p-1"><MdDelete className="text-red-500 text-xl" onClick={deletetask}/></div></div>
        
        <div className="my-2">
        <h2 className=" text-slate-400 ">Description</h2>
        <p className="ml-2 ">{task.description}</p>
        </div>

        <div>
          <h2 className=" text-slate-400">Categories</h2>
        <p className=" bg-red-600 rounded-full py-1 text-xs px-2 w-min text-red-200">{task.category}</p>
        </div>

        <div className="my-2">
          <h2 className=" text-slate-400 ">Task participants</h2>
          <div className="flex gap-1 flex-wrap text-slate-200">{task.participants.map((e)=>(<div className=" bg-slate-500 py-1 px-2 rounded-full text-xs">{e}</div>))}</div>
        </div>

        <div className="my-2">
          <h2 className="text-slate-400">Created by</h2>
          <p className="text-sm">Me@projectmanger.com</p>
        </div>

        <div className="flex justify-end text-sm text-slate-400">{} {formatDistanceToNow(new Date(task.createdAt),{addSuffix:true})}</div>
        {error && <div>{error}</div>}
      </Modal>
    </div> );
}
 
export default TaskDetails;