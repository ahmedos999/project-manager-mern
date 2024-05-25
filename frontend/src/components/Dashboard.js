import { useEffect, useState } from "react";
import Card from "./Card";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "react-modal";
import { MdAddToPhotos } from "react-icons/md";

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

    const handleSumbit = async()=>{

        const task = {taskName,taskDescription,taskCategory}
        console.log(task)
        const response = await fetch('/api/tasks',{
            method:'POST',
            body:JSON.stringify(task),
            headers:{
                'content-type':'application/json'
            }
        })
        console.log(response)
        const json = await response.json()
        console.log(json)

        if(response.ok){
            setTaskName('')
            setTaskDescription('')
            setTaskCategory('')
            setModalOpen(false)
        }

        if(!response.ok){
            setError(json.error)
        }
    }

    const [tasks,setTasks] = useState([])
    const [modalOpen, setModalOpen] = useState(false);


    const [taskName,setTaskName] = useState()
    const [taskDescription,setTaskDescription] = useState()
    const [taskCategory,setTaskCategory] = useState()

    const [error,setError] = useState()

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
        
        <h2 className=" text-4xl font-bold teko">Task Boards</h2>
        <h4 className=" text-lg font-semibold">Facebook</h4>

        <div className="grid grid-cols-4 gap-2 custom-scrollbar">
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id}><Card task={task}></Card></div> 
                ))
            }
            
            <div className="rounded-md bg-gray-900 hover:bg-slate-800 shadow-md p-4 cursor-pointer flex justify-center items-center h-48" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
    </div>
            
        
            
        </div>
        <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div className="flex justify-between"><h2 className="text-3xl font-bold teko mb-8">Add a new Task</h2><MdAddToPhotos className="text-2xl"></MdAddToPhotos></div>
        <label className="text-sm">Task name</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm font-light" placeholder="here the name of your task" onChange={(e)=>setTaskName(e.target.value)} value={taskName} />
        <label className="text-sm">Task Description</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm font-light" placeholder="Descripe your task here" onChange={(e)=>setTaskDescription(e.target.value)} value={taskDescription}/>
        <label className="text-sm">Task Category</label>
        <input type="text" className="w-full rounded p-1 mb-2 placeholder:text-sm font-light" placeholder="Add your task categories here" onChange={(e)=>setTaskCategory(e.target.value)} value={taskCategory} />
        <div className="flex justify-center mt-4"><button className=" bg-slate-600 py-2 px-8 rounded hover:bg-slate-700 mt-2" onClick={handleSumbit}>Add Task</button></div>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      </Modal>
    </div> );
}
 
export default Dashboard;