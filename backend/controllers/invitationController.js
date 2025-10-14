const Invitation = require("../models/Invitation");
const User = require("../models/User");

exports.getAllInvitations = async (req, res) => {

    const userId = req.user.id;

    try {
        const invitations = await Invitation.find({ inviteeId: userId }).populate('eventId', 'title location description').populate('inviterId', 'username email profileImageUrl').sort({ date: -1 });
        res.status(200).json(invitations);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getInvitation = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const invitation = await Invitation.findOne({ inviteeId: userId, _id:id }).populate('eventId', 'title location description').populate('inviterId', 'username email profileImageUrl');
        if(!invitation) {
            return res.status(404).json({ message: 'Invitation not found' });
        }
        res.status(200).json(invitation);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.updateInvitation = async (req, res) => {
    const { status } = req.body;
    const userId = req.user.id;
    const { id } = req.params;

    try {

        if(!status) return res.status(400).json({ message: 'Status is required' });

        const invitation = await Invitation.findOne({ inviteeId: userId, _id:id}).populate('eventId','participants').populate('inviteeId','email');
        if(!invitation) return res.status(404).json({ message: "Invitation not found" });

        invitation.status = status;
        const participant = invitation.eventId.participants.find(p => p.email === invitation.inviteeId.email);
        participant.status = status;
        const event = invitation.eventId;
        await invitation.save();
        await event.save();
        res.status(200).json({ message: 'Invitation Status Updated' });

    } catch(error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

exports.getPendingRespondedInvitations = async (req, res) => {
    const userId = req.user.id;

    try {
        const pendingInvitations = await Invitation.find({ inviteeId: userId, status: 'Pending'}).populate('eventId', 'title location description').populate('inviterId', 'username email profileImageUrl').sort({ date: -1 });
        const respondedInvitations = await Invitation.find({ inviteeId: userId, status: { $in: ['Accepted', 'Declined']} }).populate('eventId', 'title location description').populate('inviterId', 'username email profileImageUrl').sort({ date: -1 });
        res.status(200).json({ pendingInvitations, respondedInvitations });

    } catch(error) {
        res.status(500).json({ message:'Server Error' });
    }
}