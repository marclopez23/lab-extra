const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = {
    correo: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;