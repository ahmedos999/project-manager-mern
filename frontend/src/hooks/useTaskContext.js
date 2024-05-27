import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

export const useTaskContext = () => {
    const context = useContext(TaskContext)
    if(!context){
        throw Error('useTask must be used inside taskContectProvider')
    }
    return context;
}