const mongoose = require('mongoose')
const mongodb = require('mongodb')
mongoose.connect('mongodb+srv://rpbarmaiya:QeKJFmeWRLJ2m9tx@cluster0.bbhpkel.mongodb.net/?retryWrites=true&w=majority');


const db = mongoose.connection;

// if any kind of error found 
db.on('error', console.error.bind(console, 'error in binding'));
db.once('open', function () {
    console.log('successfully connected to Database')
})


module.exports = db;