const SideBar = () => {
    return ( <div className="sidebar p-4 flex flex-col h-screen w-full justify-between">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-400 mr-2"></div>
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