var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String},
    profilePic: {type: String},
    description: {type: String},
    backgroundColor: {type: String},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('User', userSchema);