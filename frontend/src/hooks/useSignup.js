import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useSignup = ()=>{

    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)
    const {dispatch} = useAuthContext()

 const urlApi = 'https://project-manager-mern-hrm0.onrender.com'
//  const urlApi = 'http://localhost:4000'

    const signup = async(email,password)=>{
        setIsLoading(true)
    
        const response = await fetch(`${urlApi}/api/user/signup`,
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })
    
            const json = await response.json()
    
            if(response.ok){
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type:'LOGIN',payload:json})
                setIsLoading(false)
            }
    
            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
    }

    return {signup,isLoading,error}


}
