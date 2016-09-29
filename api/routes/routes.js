"use strict";

//NodeJS in-built packages 
var express = require('express');

//Custom packages
var controller = require('.././controller/controller.js');


//express router
var router = express.Router();

//Define routes
//Route for getting current weather details
router.get('/currentWeatherDetails', controller.currentWeatherDetails);

//Route for getting forecast details
router.get('/forecastDetails', controller.forecastDetails);

module.exports = router;
