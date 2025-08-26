const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        date: {type: Date, required: true},
        time: {
            start: {type: String},
            end: {type: String},
        },
        location: {type: String, required: true},
        description: {type: String},
        participants: [
            {
                email: {type: String, required: true},
                status: {type: String, enum: ['Accepted','Pending','Declined'], default: 'Pending'}
            }
        ],
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event',EventSchema);