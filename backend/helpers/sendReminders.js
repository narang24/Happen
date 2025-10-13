const Event = require("../models/Event");
const sendMail = require("./sendMail");

const sendReminders = async () => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)

    try {
    const events = await Event.find({ date: {$gte: today, $lt: tomorrow}});
    events.forEach((event) => {
            event.participants.forEach((participant) => {
                if(participant.status === 'Accepted')
                sendMail(participant.email, `Reminder for ${event.title}`, `
                <p>Your gracious presence is awaited at</p>
                <p>${event.title}</p>
                <p>On ${event.date.toDateString()}</p>
                <p>Taking place at ${event.location}</p>
                <p>Description: ${event.description}</p>
                `);
            })
    })
    } catch(error) {
        console.log('Server Error');
    }
}

module.exports = sendReminders;