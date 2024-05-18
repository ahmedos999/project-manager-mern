import Dashboard from "../components/Dashboard";
import SideBar from "../components/sidebar";



const Home = () => {
    return ( <div className=" grid grid-cols-6">
        <SideBar></SideBar>
        <div className="col-span-4">
        <Dashboard></Dashboard>
        </div>
        {/* friends list */}
    </div> );
}
 
export default Home;