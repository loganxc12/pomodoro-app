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
    },
    
    update: function (req, res) {
        User.findByIdAndUpdate(req.user._id, { name: req.body.name, website: req.body.website, bio: req.body.bio}, {new: true}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    refresh: function(req, res) {
        User.findOne({'_id': req.user._id}, function(err, result) {
            if (err) {
               res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    updateCover: function(req, res) {
        console.log(req.body);
        User.findByIdAndUpdate(req.user._id, { coverPic: req.body.url }, {new: true}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    updateProfile: function(req, res) {
        console.log(req.body);
        User.findByIdAndUpdate(req.user._id, { profilePic: req.body.url }, {new: true}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    getAllUsers: function(req, res) {
        User.find({}, function(err, result) {
            console.log(result);
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    }, 
    
    getOne: function(req, res) {
        User.findOne({'_id': req.params.user}, function(err, result) {
            if (err) {
               res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    addToFollowing: function (req, res) {
        User.findByIdAndUpdate(req.user._id, {$addToSet: {following: req.body.user}}, {new: true}, function(err, result) {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        })
    },
    
    getFollowing: function (req, res) {
        User.find
    }
    
}