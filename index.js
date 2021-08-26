var express = require('express');
var authRouter = require('./routes/auth');
var myaccountRouter = require('./routes/myaccount');
var usersRouter = require('./routes/users');
var passport = require('passport')
var cookieParser = require('cookie-parser');
var cors = require('cors');


var app = express();

require('./boot/db')();
require('./boot/auth')();

app.listen(5000, () => {
  console.log("Server running on port 5000");
 });


const corsOptions = {credentials: true}


app.use(cors(corsOptions));
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// Define routes.
// Routes inside the routers add up to the specified route. 
app.use('/', authRouter);
app.use('/myaccount', myaccountRouter);
app.use('/users', usersRouter);