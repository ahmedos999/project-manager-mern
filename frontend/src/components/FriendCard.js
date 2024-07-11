

const FriendCard = ({name}) => {
    const color = {
        0:"bg-cyan-500",
        1:"bg-red-500",
        2:"bg-green-500",
        3:"bg-blue-500",
        4:"bg-purple-500",
        5:"bg-yellow-500",

    }

    let number = Math.floor(Math.random() * 6)

    console.log(number)
    return ( 
<div className="email-container">
      <div className={`email-initial ${color[number]}`}>
        {name.email[0].toUpperCase()}
        <div className={`email-full ${color[number]}`}>{name.email}</div>
      </div>
    </div> );
}
 
export default FriendCard;