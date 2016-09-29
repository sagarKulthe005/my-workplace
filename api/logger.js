"use strict";

//NodeJS in-built packages 
var winston = require('winston');

winston.emitErrs = true;
var date = new Date();
var appendToExternalId = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: './logs/all-logs-' + appendToExternalId + '.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ],
    exitOnError: false
});


module.exports = logger;
module.exports.stream = {
    write: function (message) {
        logger.info(message);
    }
};