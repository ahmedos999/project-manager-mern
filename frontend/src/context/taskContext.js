import { createContext, useReducer } from "react";

export const TaskContext = createContext()

export const taskReducer = (state,action)=>{

    switch(action.type){
        case 'SET_TASKS':return{tasks:action.payload,allTasks: state.allTasks}
        case 'SET_ALL_TASKS':return {
            ...state,
            tasks: action.payload,
            allTasks: action.payload
        };
        case 'CREATE_TASK':return{tasks:[action.payload,...state.tasks],allTasks:[action.payload,...state.allTasks]}
        case 'DELETE_TASK':return{tasks:state.tasks.filter((task)=>task._id!==action.payload._id),allTasks:state.allTasks.filter((task)=>task._id!==action.payload._id)}
        case 'FINISH_TASK':return{tasks:state.tasks.map((task) => {
            console.log(task)
            if (task._id === action.payload._id) {
                console.log(task)
                return { ...task, status: 'done' };
            }
            return task;
        }),
        allTasks:state.allTasks.map((task) => {
            console.log(task)
            if (task._id === action.payload._id) {
                console.log(task)
                return { ...task, status: 'done' };
            }
            return task;
        })}
        case 'EMPTY_TASK':return{tasks:[],allTasks:[]}
        default:return state
    }
}



export default function TaskContextProvider({children}) {
    const [state,dispatch] = useReducer(taskReducer,{
        tasks:null,
        allTasks:null
    })
    return ( <TaskContext.Provider value={{...state,dispatch}}>
        {children}
    </TaskContext.Provider> );
}