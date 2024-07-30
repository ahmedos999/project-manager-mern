import { Chart } from "../components/Chart";
import Dashboard from "../components/Dashboard";
import Friendslist from "../components/FriendsList";
import SideBar from "../components/sidebar";



// "proxy": "https://project-manager-mern-hrm0.onrender.com",
const Home = () => {
    return ( <div className=" grid grid-cols-8">
        <SideBar></SideBar>
        <div className="col-span-6">
        <Dashboard></Dashboard>
        </div>
        <div className="flex flex-col items-center justify-around">
        <Chart ></Chart>
        <Friendslist></Friendslist>
        <div></div>
        </div>
    </div> );
}
 
export default Home;