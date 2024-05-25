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

        const task = {title:title.trim(),description:description.trim(),category:category.trim()}
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
            setName('')
            setDescription('')
            setCategory('')
            setModalOpen(false)
        }

        if(!response.ok){
            setError(json.error)
        }
    }

    const [tasks,setTasks] = useState([])
    const [modalOpen, setModalOpen] = useState(false);


    const [title,setName] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')

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

        <div className="grid grid-cols-4 gap-2 custom-scrollbar auto-rows-max">
            {
                tasks && tasks.map((task)=>(
                   <div key={task._id}><Card task={task}></Card></div> 
                ))
            }
            
            <div className="rounded-md bg-gray-800 hover:bg-slate-700 shadow-md p-4 cursor-pointer flex justify-center items-center" onClick={()=>setModalOpen(true)}>
            <div className="h-16 w-16 rounded-full bg-slate-600 flex justify-center items-center"><IoIosAddCircle className="text-3xl"/></div>
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
        <div className="flex justify-center mt-4"><button className=" bg-slate-600 py-2 px-8 rounded hover:bg-slate-700 mt-2" onClick={handleSumbit}>Add Task</button></div>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

      </Modal>
    </div> );
}
 
export default Dashboard;