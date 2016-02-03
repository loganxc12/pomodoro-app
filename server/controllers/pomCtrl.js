var Poms = require('./../models/pomodoroModel');

module.exports = {
    
    create: function (req, res) {
        Poms.create(req.body, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    read: function (req, res) {
        Poms.find({}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    }   
    
}