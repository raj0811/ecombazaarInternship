const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');
const cloudinary = require('cloudinary').v2;
const port = 8009
const app = express();
const flash = require('connect-flash');

const customMware= require('./config/middleware')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('assets'));

const MongoStore = require('connect-mongo');

cloudinary.config({ 
    cloud_name: 'dw8rpoiil', 
    api_key: '143649366316163', 
    api_secret: 'GsZF65V_kqxrzhET0iYACVgTRJg' 
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  

app.use(session({
    name: 'My ecom store',
    secret: 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000)
    },
    store: MongoStore.create({

        mongoUrl: 'mongodb+srv://mrunknown0086:bKUGYxe6L5jdb8dL@cluster0.nc5fl1b.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'error in connect - mongodb setup ok');
        }
    )
}));


app.use(expressLayouts);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(flash());
app.use(customMware.setFlash)

app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);

})