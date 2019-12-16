const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    name: {
        type: String,
        reguired: true
    },
    Date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Itinerary', schema);
