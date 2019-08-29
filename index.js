var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../iTrackerDB'));

var mongoUtil = require('./mongoUtil.js');

mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);
});

var prj = require('./createProject.js');

app.use('/prj', prj);
app.listen(4000);