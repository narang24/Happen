const EmailHTML = require('../EmailHTML');
const sendMail = require('../helpers/sendMail');
const Event = require('../models/Event');
const Invitation = require('../models/Invitation');
const User = require('../models/User');

exports.addEvent = async (req, res) => {
    const userId = req.user.id;
    const { title, date, time, location, description, participants } = req.body;

    if (!title || !date || !location)
        return res.status(400).json({ message: 'All Required fields must be filled' });

    if (!participants || participants.length === 0)
        return res.status(400).json({ message: 'At least one participant is required' })

    try {
        const event = await Event.create({
            title,
            date: new Date(date),
            time,
            location,
            description,
            participants,
            userId,
        });

        for (const participant of participants) {
            const isUser = await User.findOne({ email: participant.email });
            if (isUser) {
                await Invitation.create({
                    eventId: event._id,
                    inviteeId: isUser._id,
                    inviterId: userId,
                    status: participant.status,
                    date: date,
                });
            };
        }

        res.status(201).json({ message: 'Event Added Successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }


}

exports.getAllEvents = async (req, res) => {
    const userId = req.user.id;

    try {
        const events = await Event.find({ userId }).sort({ date: -1 });
        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const order = { "Pending": 1, "Accepted": 2, "Declined": 3 };
    try {
        const event = await Event.findOne({ userId, _id: id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        event.participants = event.participants.sort((a, b) => order[a.status] - order[b.status]);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.editEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const { title, date, time, location, description, participants } = req.body;

    if (!title || !date || !location)
        return res.status(400).json({ message: 'All Required fields must be filled' });

    if (!participants || participants.length === 0)
        return res.status(400).json({ message: 'At least one participant is required' })

    try {
        const event = await Event.findOneAndUpdate({ userId, _id: id }, {
            title,
            date,
            time,
            location,
            description,
            participants,
            userId,
        }, { new: true });
        if (!event)
            return res.status(404).json({ message: 'Event not found' })
        res.status(200).json({ message: 'Event Updated Successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const event = await Event.findOneAndDelete({ userId, _id: id });
        if (!event)
            return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted Successfully!' });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

