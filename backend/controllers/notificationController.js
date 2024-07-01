const Notification = require('../models/NotificationModel');
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

const markasRead = async(req,res)=>{
    const user_id = req.user._id

    try {
        const notifications = await Notification.findByIdAndUpdate(user_id, {isRead:true});
        res.status(200).json(notifications);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}


const addNotification = async(req,res)=>{
    const {user_id,project,owner} =  req.body

    try {
        const notifications = await Notification.create({user_id,project,owner});

        const io = getIO();
        io.to(user_id).emit('notification', 'test of notification');
        res.status(200).json(notifications);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

}

module.exports = {getAllUserNotification,markasRead,addNotification}