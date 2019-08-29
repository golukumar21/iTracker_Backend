var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '../iTrackerDB'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/iTracker', { useNewUrlParser: true });

var createProject = require('./createProject.js');

app.use('/createProject', createProject);

module.exports = router;
app.listen(4000);