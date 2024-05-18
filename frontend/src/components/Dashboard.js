import Card from "./Card";

const Dashboard = () => {
    return ( <div className="p-2 ">
        
        <input type="text" className="w-full m-4 rounded-full p-2" placeholder="Search here ..."/>
        
        <h2 className=" text-3xl font-bold">Task Boards</h2>
        <h4 className=" text-lg font-semibold">Facebook</h4>

        <div className="grid grid-cols-4 gap-2">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            
        
            
        </div>
    </div> );
}
 
export default Dashboard;