var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');

var pomController = require('./controllers/pomCtrl');
var userController = require('./controllers/userCtrl');

var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ 
    secret: 'cruddy muffins',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/../public'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
    done(null, user);  
    done(null, null); 
    done(new Error('error!'));
}));

var mongoUri = "mongodb://localhost:27017/pomodoro";
mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
    console.log('Successfully connected to mongodb');
 })

//ENDPOINTS

app.post('/login', passport.authenticate('local'), function(req, res) {
    
})
app.post('/poms', pomController.create);
app.get('/poms', pomController.read);
app.post('/users', userController.create);
app.get('/users/:email', userController.read);

app.listen(3000, function() {
    console.log('server listening on port 3000');
})