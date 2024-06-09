import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignin = ()=>{

 const [isLoading,setIsLoading] = useState(false)
 const [error,setError] = useState(null)
 const {dispatch} = useAuthContext()

    const signin = async(email,password)=>{
        console.log(email+" "+password)
        setIsLoading(true)
        const response = await fetch('api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()

        if(response.ok){
            localStorage.setItem('user',json)
            setIsLoading(false)
            dispatch({type:'LOGIN',payload:json})
        }else{
            console.log(json)
            setIsLoading(false)
            setError(json.error)
        }
        
    }
    

    return {signin,isLoading,error}
}