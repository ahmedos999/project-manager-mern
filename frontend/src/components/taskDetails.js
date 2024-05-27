import { useEffect, useState } from "react";
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

    useEffect(()=>{
        setModalOpen(true)
    },[task])

    return ( task && <div>
        <Modal
        isOpen={modalOpen}
        onRequestClose={setModalOpen(false)}
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <h2>{task.task.title}</h2>
        <div>{task.task.createdAt}</div>
        <p>{task.task.description}</p>
        <p>{task.task.category}</p>
      </Modal>
    </div> );
}
 
export default TaskDetails;