const sendMail = require("../helpers/sendMail");
const Event = require("../models/Event");
const User = require("../models/User");

exports.inviteEmail = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    if(!email) return res.status(400).json({ message:'Email is required' });

    try {
        const event = await Event.findOne({ _id: id });
        if(!event) return res.status(404).json({ message: 'Event not found!' });

        const statusUrl = `${process.env.SERVER_URL}/api/event/get-event/${id}/status`;
        await sendMail(email,`Invitation for ${event.title}`,`
                <p>Hey, you have been invited to grace the event</p>
                <p>${event.title}</p>
                <p>${event.description}</p>
                <p>Date: ${event.date}</p>
                <p>Location: ${event.location}</p>
                <div style="display: flex; gap: 2em; justify-content: center; align-items: center;">
                    <a href="${statusUrl}?accepted=true&email=${email}" style="text-decoration: none; padding: 1em; font-size: 14px; border: 2px solid  #B7410E; background-color: transparent; color: #B7410E;">ACCEPT</a>
                    <a href="${statusUrl}?accepted=false&email=${email}" style="text-decoration: none; padding: 1em; font-size: 14px; border: 2px solid  #B7410E; background-color: transparent; color: #B7410E;">DECLINE</a>
                </div>
        `);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch(error) {
        return res.status(500).json({ message:'Server Error' });
    }
}

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { accepted, email } = req.query;
    
    try {
        if(!email) return res.status(400).json({ message: 'Email is required' });

        const event = await Event.findOne({ _id: id });
        if(!event) return res.status(404).json({ message: 'Event not found' });

        const participant = event.participants.find(p => p.email===email);
        if(!participant) return res.status(404).json({ message: 'Participant not found' });

        if(participant.status !== 'Pending') 
            return res.status(400).json({ message: 'Already updated' });

        participant.status = accepted === "true" ? 'Accepted':'Declined';
        await event.save();

        res.status(200).json({ message: 'Status updated successfully', event });
    } catch(error) {
        res.status(500).json({ message:'Server Error' });
    }
    
}