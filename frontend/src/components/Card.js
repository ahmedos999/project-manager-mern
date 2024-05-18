const Card = () => {
    return ( <div className="rounded-md bg-gray-900 shadow-md p-4">
        <div className="flex justify-between"><h2 className=" font-bold">Model Answer</h2><p className="text-xs">2</p></div>
        <div className="flex my-2">
            <div className="w-1/4 rounded bg-red-950 mr-2"><p className=" text-red-500 text-xs text-center">TODO</p></div>
            <div className="w-1/4 rounded bg-blue-950 mr-2"><p className=" text-blue-500 text-xs text-center">Design</p></div>
            <div className="w-1/4 rounded bg-green-950 mr-2"><p className=" text-green-500 text-xs text-center">Backlog</p></div>
        </div>
        <div className="flex my-2">
        <div className="w-5 h-5 rounded-full bg-orange-400 mr-2"></div>
        <div className="w-5 h-5 rounded-full bg-green-400 mr-2"></div>
        <div className="w-5 h-5 rounded-full bg-blue-400 mr-2"></div>
        </div>
    </div> );
}
 
export default Card;