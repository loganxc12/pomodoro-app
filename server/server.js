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
app.post('/register', userController.create);
app.get('/users/:email', userController.read);
app.put('/users', userController.update);
app.get('/users', userController.refresh);

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