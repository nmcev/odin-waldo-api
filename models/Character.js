const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const characterSchema = new Schema({
    name: { type: String },
    coordination: { type: Object },
})

module.exports = mongoose.model('character', characterSchema);