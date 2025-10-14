const Event = require("../models/Event");
const Invitation = require("../models/Invitation");

exports.scheduleData = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const invitations = await Invitation.find({ inviteeId: userId }).populate('eventId', 'title participants');
        const events = await Event.find({ userId });
        const total = [...invitations, ...events];
        total.sort((a, b) => b.date - a.date);
        
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}