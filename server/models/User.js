const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company:{type: String, required: true},
    age:{type: Number, required: true},
    dob:{type:Date, required: true},
    profileImage: { type: String, default: '' },
    otp: { type: Number },
    otpExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);