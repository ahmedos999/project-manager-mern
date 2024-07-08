import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Card = ({task}) => {
    return ( <div className="rounded-md bg-gray-800 shadow-md p-4 flex flex-col justify-between m-2">
        <div className="flex justify-between items-center"><h2 className=" font-bold teko text-lg">{task.title}</h2><p className="text-xs text-gray-500">{formatDistanceToNow(new Date(task.createdAt),{addSuffix:true})}</p></div>
        <p className='my-2 text-sm text-gray-300'>{task.description}</p>
        <div className="flex my-2">
            <div className=" rounded bg-red-950 mr-2"><p className=" text-red-500 text-xs text-center">{task.category}</p></div>
            <div className=" rounded bg-blue-950 mr-2"><p className=" text-blue-500 text-xs text-center">Design</p></div>
            <div className=" rounded bg-green-950 mr-2"><p className=" text-green-500 text-xs text-center">Backlog</p></div>
        </div>
        <div className="flex my-2">
            {task.participants.map((part,index)=>(
                <div className={`w-6 h-6 rounded-full mr-1 flex justify-center items-center text-sm font-bold ${index%3===0?`bg-orange-400`:index%3===1?`bg-green-400`:`bg-blue-400`}`}>{part[0].toUpperCase()}</div>
            ))}
        </div>
    </div> );   
}
 
export default Card;