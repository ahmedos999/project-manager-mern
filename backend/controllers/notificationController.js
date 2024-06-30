const Notification = require('../models/Notification');
const {getIO} = require('../middleware/socketio')

const getAllUserNotification = async(req,res)=>{
    const user_id = req.user._id


    try {
        const notifications = await Notification.find({ user_id });
        res.status(200).json(notifications);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}

const markasRead = async()=>{
    const user_id = req.user._id

    try {
        const notifications = await Notification.findByIdAndUpdate(user_id, {isRead:true});
        res.status(200).json(notifications);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}


const addNotification = async()=>{
    const {user_id,project,owner} =  req.body

    try {
        const notifications = await Notification.create({user_id,project,owner});

        const io = getIO();
        io.to(user_id).emit('notification', message);
        res.status(200).json(notifications);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}

module.exports = {getAllUserNotification,markasRead,addNotification}