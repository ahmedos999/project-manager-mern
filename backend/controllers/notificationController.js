const Notification = require('../models/Notification');

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