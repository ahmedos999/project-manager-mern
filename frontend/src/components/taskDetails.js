import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";

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

const TaskDetails = (task) => {

  const [modalOpen,setModalOpen] = useState(true)
  const [error,setError] = useState()

  const deletetask = async()=>{
    const response = await fetch('api/tasks/'+task.task._id,{
      method:'DELETE',
    })
    const json =  await response.json()

    if(!response.ok){
      setError(json.error)
    }
    setModalOpen(false)
  }

    

    useEffect(()=>{
        setModalOpen(true)
    },[])

    return (<div>
        <Modal
        isOpen={modalOpen}
        onRequestClose={()=>setModalOpen(false)}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <div className="flex justify-between mx-2"><h2>{task.task.title}</h2><MdDelete onClick={deletetask}/></div>
        <div>{task.task.createdAt}</div>
        <p>{task.task.description}</p>
        <p>{task.task.category}</p>
        {error && <div>{error}</div>}
        <h2>test</h2>
      </Modal>
    </div> );
}
 
export default TaskDetails;