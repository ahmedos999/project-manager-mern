import { useAuthContext } from '../hooks/useAuthContext';
import img from '../imgs/pp.jpg'


const SideBar = () => {
    const {user,dispatch} = useAuthContext()
    const logout =()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
    }
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center mt-8">
            <div className="w-14 h-14 mr-2 bg-slate-600 rounded-full flex justify-center items-center text-3xl">{user.email.substring(0,1).toUpperCase()}</div>
            <h2 className="">{user.email.substring(0,(user.email.indexOf('@')))}</h2>
        </div>
        <button onClick={logout} className='font-bold self-start rounded p-1 bg-gray-800'>
            Logout
        </button>
    </div> );
}
 
export default SideBar;