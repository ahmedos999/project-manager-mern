import FriendCard from "./FriendCard";
import {useEffect, useState} from 'react'
import { useAuthContext } from "../hooks/useAuthContext";



const urlApi = 'https://project-manager-mern-hrm0.onrender.com'
// const urlApi = 'http://localhost:4000'
const Friendslist = () => {
    const [friends,setFriends] = useState([])
    const {user} = useAuthContext()

    useEffect(()=>{

        const fetchfriends = async()=>{
            const res = await fetch(`${urlApi}/api/user/allusers`)

            const json = await res.json()

            if(res.ok){
                let temp = json.filter(e=>e.email!==user.email)
                setFriends(temp)
                
            }
        }
        fetchfriends()
    },[user.email])
    return ( <div className="flex flex-col gap-2">
        {
            friends && friends.map((friend,index)=>(<FriendCard key={index} name={friend}/>))
        }
        
    </div> );
}
 
export default Friendslist;