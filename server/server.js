//EXTERNAL DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AWS = require('aws-sdk');

//MY FILE DEPENDENCIES
var pomController = require('./controllers/pomCtrl');
var userController = require('./controllers/userCtrl');
var User = require('./models/userModel.js');
var config = require('./secret-config');

//CREATE EXPRESS APP
var app = express();

require('./config/passport')(passport);

//MIDDLEWARE
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//STATICALLY SERVE PUBLIC FOLDER
app.use(express.static(__dirname + '/../public'));

//AMAZON S3 SETUP
var bucketName = 'pomifybucket';

AWS.config.update({
    accessKeyId: process.env.AMZ_S3_ID,
    secretAccessKey: process.env.AMZ_S3_SECRET,
    region: process.env.AMZ_S3_REGION
});

var s3 = new AWS.S3();

//CONNECT TO MONGO DATABASE VIA MONGOOSE
var mongoUri = "mongodb://localhost:27017/pomodoro";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log('Successfully connected to mongodb');
 })

//ENDPOINTS
app.post('/login', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup'
}));
app.post('/poms', pomController.create);
app.get('/poms', pomController.read);
app.get('/userPoms/:user', pomController.getOne);
//app.get('graphPoms/:user', pomController.getOne);
app.post('/register', userController.create);
app.get('/users/:email', userController.read);
app.put('/users', userController.update);
app.put('/usercover', userController.updateCover);
app.put('/userprofile', userController.updateProfile);
app.put('/follow', userController.addToFollowing);
app.get('/followingList/:user', userController.getFollowing);
app.get('/users', userController.refresh);
app.get('/usersList', userController.getAllUsers);
app.get('/userx/:user', userController.getOne);


//FILE UPLOAD ENDPOINT
app.post('/uploadImage', function(req, res) {
    console.log('FILENAME ', req.body.fileName);
    var buf = new Buffer(req.body.fileBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var params = {
        Bucket: bucketName,
        Key: req.body.fileName,
        Body: buf,
        ContentType: 'image/' + req.body.fileName.substring(req.body.fileName.lastIndexOf('.')),
        ACL: 'public-read'
    };
    
    s3.upload(params, function(err, data) {
        if(err) {
            console.error(err);
            return res.json(err);
        } else {
            console.log('upload successful');
            return res.json(data);
        }
    });     
})


//START UP SERVER
app.listen(3000, function() {
    console.log('server listening on port 3000');
})





/* 

app.use(cookieParser());
app.use(expressSession({ 
    secret: 'cruddy muffins',
    resave: false,
    saveUninitialized: false
}));

passport.use(new passportLocal.Strategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());


app.post('/register', function(req, res) {
    var user = new User({
        email: req.body.email,
        password: req.body.password
    })
    user.save(function(err) {
        if (err) {
            console.log('ERRORERROR!')
        } else {
            res.json(user);
        }
    })
})

app.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (!user) {
            console.log('No such user!');
        } else {
            if (req.body.password === user.password) {
                res.json(user);
            } else {
                console.log('No matchy!');
            }
        }
    })
})

//PASSPORT MIDDLEWARE
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}), function(username, password, done) {
    User.findOne({ username: username}, function(err, user) {
        if (err) {return done(err); }
        if (!user) {return done(null, false, {message: 'Invalid username.'}); }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
  }
);

*/

// localhost:3000/#/profile
// localhost:3000/#/view