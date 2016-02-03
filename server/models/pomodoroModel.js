var mongoose = require('mongoose');

var pomodoroSchema = new mongoose.Schema({
    completed: {type: Boolean},
    timeCompleted: {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Pom', pomodoroSchema);

//user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}