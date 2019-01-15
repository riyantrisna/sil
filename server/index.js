const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/config');

// setup express app
const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//initialize routes
app.use('/api/v1', require('./routes/user'));
app.use('/api/v1', require('./routes/outlet'));


//error handiling midelware
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handiling midelware
app.use(function(err, req, res, next){
    res.status(err.status || 500).send({
        message: err.message,
        error: config.app.env === 'development' ? err : {}
    });
});

// listen for request
app.listen(config.app.port || 4000, function (){
    console.log('services started');
});