import FriendCard from "./FriendCard";
import img from '../imgs/f1.jpg'
import img1 from '../imgs/f2.jpg'
import img2 from '../imgs/f3.jpg'
import img3 from '../imgs/f4.jpg'
import img4 from '../imgs/f5.jpg'

const Friendslist = () => {
    return ( <div className="flex flex-col gap-4">
        <FriendCard img={img}></FriendCard>
        <FriendCard img={img1}></FriendCard>
        <FriendCard img={img2}></FriendCard>
        <FriendCard img={img3}></FriendCard>
        <FriendCard img={img4}></FriendCard>
    </div> );
}
 
export default Friendslist;