"use strict";

//NodeJS in-built packages 
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    session = require('express-session');

//Custom packages
var routes = require('./api/routes/routes'),
    config = require('./api/config'),
    logger = require('./api/logger');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use express session 
var date = new Date();
var appendToExternalId = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

app.use(session({
    secret: appendToExternalId + 'weather123',
    saveUninitialized: true,
    resave: false
}));

app.use('/api', routes);

var httpServer = http.createServer(app);
httpServer.listen(config.port);
logger.info("server started on " + config.port);

