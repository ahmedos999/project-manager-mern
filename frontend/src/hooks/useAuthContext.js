import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const useAuthContext = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error('use Context must be used inside Auth context provider')
    }
    
    return context
}