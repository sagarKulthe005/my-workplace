"use strict";

//NodeJS in-built packages 
var express = require('express');
//Custom packages
var controller = require('.././controller/controller.js');
//Express router
var router = express.Router();

//Define routes
/**
 * This function works as route 
 * for api which provides current 
 * weather details as per requested city
 * @route
 * 
 * */
router.get('/currentWeatherDetails', controller.currentWeatherDetails);

/**
 * This function works as route 
 * for api which provides five days 
 * per three hours forecast details 
 * as per requested city
 * @route
 * 
 * */
router.get('/forecastDetails', controller.forecastDetails);

module.exports = router;
