const mongoose = require('mongoose');
const Event = require('../models/Event');

exports.getRecentScheduledEvents = async (req, res) => {

    const userId = req.user.id;

    const now = new Date();
    
    try {
        const recentEvents = await Event.find({ userId, date: { $lt: now } }).sort({ date: -1 });

        const scheduledEvents = await Event.find({ userId, date: { $gte: now } }).sort({ date: 1 });

        if(!recentEvents || !scheduledEvents) {
            return res.status(404).json({ message: 'User Data not found' });
        }

        return res.status(200).json({ recentEvents, scheduledEvents });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}