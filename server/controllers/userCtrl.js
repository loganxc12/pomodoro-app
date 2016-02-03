var Users = require('./../models/userModel');

module.exports = {
    
    create: function (req, res) {
        Users.create(req.body, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    read: function (req, res) {
        Users.findOne({'email': req.params.email}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    }
    
}