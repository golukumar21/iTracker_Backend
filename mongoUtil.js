const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/iTracker";

var _db;

module.exports = {

    connectToServer: function () {
        mongoose.connect(url, { useNewUrlParser: true }, function (err, database) {
            if (err)
                console.log(err)
            else {
                _db = database;
                console.log('Connected to MongoDB');
            }
        });
    },

    getDb: function() {
        return _db
    }
}