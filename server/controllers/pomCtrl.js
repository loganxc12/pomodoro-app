var Poms = require('./../models/pomodoroModel');

module.exports = {
    
    create: function (req, res) {
        req.body.user = req.user._id;
        Poms.create(req.body, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    read: function (req, res) {
        Poms.find({user:req.user._id}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    }   
    
}