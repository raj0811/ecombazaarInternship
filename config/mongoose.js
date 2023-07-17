const mongoose = require('mongoose')
const mongodb = require('mongodb')
mongoose.connect('mongodb+srv://mrunknown0086:bKUGYxe6L5jdb8dL@cluster0.nc5fl1b.mongodb.net/?retryWrites=true&w=majority');


const db = mongoose.connection;

// if any kind of error found 
db.on('error', console.error.bind(console, 'error in binding'));
db.once('open', function () {
    console.log('successfully connected to Database')
})


module.exports = db;