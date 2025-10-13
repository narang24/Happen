const mongoose = require('mongoose');
const Event = require('../models/Event');
const Invitation = require('../models/Invitation');

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

exports.getRecentScheduledInvitations = async (req, res) => {

    const userId = req.user.id;

    const now = new Date();
    
    try {
        const recentInvitations = await Invitation.find({ inviteeId: userId, date: { $lt: now } }).sort({ date: -1 });

        const scheduledInvitations = await Invitation.find({ inviteeId: userId, date: { $gte: now } }).sort({ date: 1 });

        if(!recentInvitations || !scheduledInvitations) {
            return res.status(404).json({ message: 'User Data not found' });
        }

        return res.status(200).json({ recentInvitations, scheduledInvitations });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}