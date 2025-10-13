const Invitation = require("../models/Invitation");

exports.getAllInvitations = async (req, res) => {

    const userId = req.user.id;

    try {
        const invitations = await Invitation.find({ inviteeId: userId }).sort({ date: -1 });
        res.status(200).json(invitations);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getInvitation = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const invitation = await Invitation.findOne({ inviteeId: userId, _id:id });
        if(!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }
        res.status(200).json(invitation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}