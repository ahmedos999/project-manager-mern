import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Card = ({task}) => {
    return ( <div className="rounded-md bg-gray-800 shadow-md p-4 flex flex-col justify-between m-2">
        <div className="flex justify-between items-center"><h2 className=" font-bold teko text-lg">{task.title}</h2><p className="text-xs text-gray-500">{formatDistanceToNow(new Date(task.createdAt),{addSuffix:true})}</p></div>
        <p className='my-2 text-sm text-gray-300'>{task.description}</p>
        <div className="flex my-2">
            {task.categories.map((category,index)=>(
                <div className={` rounded-full mr-1 flex justify-center items-center text-xs p-1 ${index%3===0?`bg-purple-500`:index%3===1?`bg-red-500`:`bg-blue-500`}`}>{category}</div>
            ))}
        </div>
        <div className="flex my-2">
            {task.participants.map((part,index)=>(
                <div className={`w-6 h-6 rounded-full mr-1 flex justify-center items-center text-sm font-bold ${index%3===0?`bg-green-500`:index%3===1?`bg-blue-500`:`bg-orange-500`}`}>{part[0].toUpperCase()}</div>
            ))}
        </div>
    </div> );   
}
 
export default Card;