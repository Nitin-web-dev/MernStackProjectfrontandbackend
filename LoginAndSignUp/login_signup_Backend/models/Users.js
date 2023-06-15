const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userpassword: { type: String, required: true },
});

const User = mongoose.model('Usersdb', userSchema);

module.exports = User;