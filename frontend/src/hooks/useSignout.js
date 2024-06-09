import { useAuthContext } from "./useAuthContext"

export const useSignout = ()=>{
    const {dispatch} = useAuthContext()
    const {dispatch:dispatchTask} = useTaskContext()

    const logout = ()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT',payload:null})
        dispatchTask({type:'SET_TASKS',payload:null})

    } 


    return {logout}
}