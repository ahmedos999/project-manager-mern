import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Draggable from './Draggable';

const Card = ({task}) => {
    const colors = {
        'urgent':'custom-shadow-red',
        'long':'custom-shadow-blue',
        'progress':'custom-shadow-yellow',
        'done':'custom-shadow-green',
    }
    return ( 
        
        
    <div className={`rounded-md bg-gray-800 shadow-md p-2 flex flex-col items-start justify-between m-2 ${colors[task.status]}`} style={{ width: '100%' }}>
        <div className="flex justify-between items-center w-full">
            <h2 className="font-bold teko text-lg">{task.title}</h2>
            <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </p>
        </div>
        <p className="my-1 text-sm text-gray-300">{task.description}</p>
        <div className="flex my-2">
            {task.categories.map((category, index) => (
                <div key={index} className={`rounded mr-1 flex justify-center items-center text-xs p-1 ${index % 3 === 0 ? 'bg-purple-500' : index % 3 === 1 ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {category}
                </div>
            ))}
        </div>
        <div className="flex my-1">
            {task.participants.map((part, index) => (
                <div key={index} className={`w-6 h-6 rounded-full mr-1 flex justify-center items-center text-sm font-bold ${index % 3 === 0 ? 'bg-green-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-orange-500'}`}>
                    {part[0].toUpperCase()}
                </div>
            ))}
        </div>
    </div>

);   
}
 
export default Card;