import img from '../imgs/pp.jpg'


const SideBar = () => {
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center mt-8">
            <div className="w-14 h-14 mr-2"><img src={img} alt="" className='rounded-full'/></div>
            <h2 className="">Ahmed Sheikh</h2>
        </div>
        <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Threads</li>
            <li>Reddit</li>
        </ul>
        <div>
            logout
        </div>
    </div> );
}
 
export default SideBar;