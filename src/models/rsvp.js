const mongoose = require('mongoose');



// SCHEMA SETUP
const rsvpSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: false
    },
    response: {
        type: String,
        required: true
    },
    guest_1: {
        type: String,
        required: false
    },
    guest_2: {
        type: String,
        required: false
    },
    guest_3: {
        type: String,
        required: false
    },
    guest_4: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model("Rsvp", rsvpSchema);