var User = require('./../models/userModel');

module.exports = {
    
    create: function (req, res) {
        var newUser = new User(req.body);
        newUser.password = newUser.generateHash(newUser.password);
        newUser.save(function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    read: function (req, res) {
        User.findOne({'email': req.params.email}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    }
    
}