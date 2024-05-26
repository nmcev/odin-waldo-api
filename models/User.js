const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    duration: { type: Number },
})

module.exports = mongoose.model('users', userSchema);