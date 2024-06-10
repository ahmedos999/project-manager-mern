import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':return{user:action.payload}
        case 'LOGOUT':return{user:action.payload}
        default:return state
    }
}

    

export default function AuthContextProvider({children}) {
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')) 
        if(user){
            dispatch({type:'LOGIN',payload:user})
        }
    },[])
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    })
    return ( <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider> );
}