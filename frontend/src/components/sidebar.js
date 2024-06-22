import { useAuthContext } from '../hooks/useAuthContext';
import img from '../imgs/pp.jpg'


const SideBar = () => {
    const {dispatch} = useAuthContext()
    const logout =()=>{
        localStorage.removeItem('user')
        dispatch({type:'LOGOUT'})
    }
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center mt-8">
            <div className="w-14 h-14 mr-2"><img src={img} alt="" className='rounded-full'/></div>
            <h2 className="">Ahmed Sheikh</h2>
        </div>
        <button onClick={logout} className='font-bold self-start rounded p-1 bg-gray-800'>
            Logout
        </button>
    </div> );
}
 
export default SideBar;