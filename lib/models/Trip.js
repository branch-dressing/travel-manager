const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    tripName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trip', schema);