import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignin = ()=>{

 const [isLoading,setIsLoading] = useState(false)
 const [error,setError] = useState(null)
 const {dispatch} = useAuthContext()
 const urlApi = process.env.REACT_APP_API_URL
//  const urlApi = 'http://localhost:4000'

    const signin = async(email,password)=>{
        setIsLoading(true)
        const response = await fetch(`${urlApi}/api/user/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()

        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            setIsLoading(false)
            dispatch({type:'LOGIN',payload:json})
        }else{
            setIsLoading(false)
            setError(json.error)
        }
        
    }
    

    return {signin,isLoading,error}
}