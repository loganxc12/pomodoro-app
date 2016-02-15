var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    website: {type: String},
    profilePic: {type: String},
    coverPic: {type: String},
    bio: {type: String},
    backgroundColor: {type: String},
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

// METHODS =========
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);