"use strict";

//NodeJS in-built packages 
var request = require('request');
var http = require('http');
//Custom packages
var config = require('../config');
var logger = require('../logger');
//Global variables
var _successStatusMessage = 'sucess';
var _errorStatusMessage = 'error';
var _invalidStatusMessage = 'invalid';
var _notFoundStatusMessage = 'not found';
var _insufficientMessage = 'insufficient parameters provided. Please provide city name';
var _weatherApiFailure = 'error while fetching weather details for {{city}}';
var _forecastApiFailure = 'error while fetching forecast details for {{city}}';
var _weatherDetailsSuccess = 'current weather details fetched successfully for {{city}}';
var _invalidCityName = '{{city}} not found';
var _forecastDetailsSuccess = 'forecast details fetched successfully for {{city}}';
//response status code
var _success = 200;
var _bad = 400;
var _error = 500;
var _notFound = 404;

/**
 * This function hits third party openweathermap api
 * to fetch current weather details for requested city.
 *  @input cityName - name of the city for which user wants current weather details
 *  @output json object consisting current weather details
 *  
 * */
exports.currentWeatherDetails = function (req, res) {
    //Local variables
    var weatherApiUrl, apiFailureMessage, finalResponse, successMessage, errorMessageNotFound, errorMessage, failureMessage;

    //Exception handling
    try {
        //Check if city name is provided
        if (req.query && req.query.cityName) {
            //Log
            logger.info('Current weather details requested for city: ' + req.query.cityName);
            //Get weatherApi url from config 
            weatherApiUrl = config.openWeatherMapUrl + config.apiCurrentWeather;

            //Replace city parameter with actual city name from requestor
            weatherApiUrl = weatherApiUrl.replace('{{city}}', req.query.cityName);

            //Append api access key
            weatherApiUrl = weatherApiUrl + config.openWeatherMapKey;

            //Call weather api to get data    
            request(weatherApiUrl, function (error, response, body) {
                //If error    
                if (error) {
                    //Log
                    logger.error('Error from openWeatherApi for current weather details requested for city: ' + req.query.cityName);
                    apiFailureMessage = _weatherApiFailure.replace('{{city}}', req.query.cityName);
                    //Return response in json format
                    res.status(_error);
                    res.json({status: _errorStatusMessage, message: apiFailureMessage});
                } else {
                    //If api returned success
                    if (response.statusCode === _success) {
                        //Parse JSON
                        finalResponse = JSON.parse(body);

                        //Check response
                        if (finalResponse.cod === _success) {
                            //Log
                            logger.info('Response code from openWeatherApi is 200 for city: ' + req.query.cityName);

                            successMessage = _weatherDetailsSuccess.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_success);
                            res.json({status: _successStatusMessage, message: successMessage, data: finalResponse});
                        } else if (parseInt(finalResponse.cod, 10) === _notFound) {
                            //Log
                            logger.info('Response code from openWeatherApi is 404 for city: ' + req.query.cityName);

                            errorMessageNotFound = _invalidCityName.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_notFound);
                            res.json({status: _notFoundStatusMessage, message: errorMessageNotFound, data: finalResponse});

                        } else {
                            //Log
                            logger.info('Failure response from openWeatherApi for city: ' + req.query.cityName);

                            errorMessage = _invalidCityName.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_error);
                            res.json({status: _errorStatusMessage, message: errorMessage, data: finalResponse});

                        }
                    } else {
                        //Log
                        logger.info('OpenWeatherApi call failed for city: ' + req.query.cityName);

                        failureMessage = _weatherApiFailure.replace('{{city}}', req.query.cityName);
                        //Return response in json format
                        res.status(_error);
                        res.json({status: _errorStatusMessage, message: failureMessage});

                    }
                }
            });

        } else {
            //Log
            logger.info('Insufficient parameters provided');

            //Return response in json format
            res.status(_bad);
            res.json({status: _invalidStatusMessage, message: _insufficientMessage});

        }


    } catch (error) {
        //Log
        logger.error('Exception occurred while fetching current weather details for city: ' + req.query.cityName);

        //Return response in json format 
        res.status(_error);
        res.json({status: _errorStatusMessage, message: _weatherApiFailure});
    }
};



/**
 * This function hits third party openweathermap api
 * to fetch 5 days per 3 hours forecast details for requested city.
 *  @input cityName - name of the city for which user wants forecast details
 *  @output json object consisting forecast details
 *  
 * */
exports.forecastDetails = function (req, res) {
    //Local variables
    var weatherApiUrl, apiFailureMessage, finalResponse, successMessage, errorMessageNotFound, errorMessage, failureMessage;

    //Exception handling
    try {
        //Check if city name is provided
        if (req.query && req.query.cityName) {
            //Log
            logger.info('Forecast details requested for city: ' + req.query.cityName);
            //Get weatherApi url from config 
            weatherApiUrl = config.openWeatherMapUrl + config.apiForecast;

            //Replace city parameter with actual city name from requestor
            weatherApiUrl = weatherApiUrl.replace('{{city}}', req.query.cityName);

            //Append api access key
            weatherApiUrl = weatherApiUrl + config.openWeatherMapKey;

            //Call weather api to get data    
            request(weatherApiUrl, function (error, response, body) {
                //If error    
                if (error) {
                    //Log
                    logger.error('Error from openWeatherApi for forecast details requested for city: ' + req.query.cityName);

                    apiFailureMessage = _forecastApiFailure.replace('{{city}}', req.query.cityName);
                    //Return response in json format
                    res.status(_error);
                    res.json({status: _errorStatusMessage, message: apiFailureMessage});
                } else {
                    //If api returned success
                    if (response.statusCode === _success) {
                        //Parse JSON
                        finalResponse = JSON.parse(body);

                        //Check response
                        if (parseInt(finalResponse.cod, 10) === _success) {
                            //Log
                            logger.info('Response code from openWeatherApi is 200 for city: ' + req.query.cityName);

                            successMessage = _forecastDetailsSuccess.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_success);
                            res.json({status: _successStatusMessage, message: successMessage, data: finalResponse});
                        } else if (parseInt(finalResponse.cod, 10) === _notFound) {
                            //Log
                            logger.info('Response code from openWeatherApi is 404 for city: ' + req.query.cityName);

                            errorMessageNotFound = _invalidCityName.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_notFound);
                            res.json({status: _notFoundStatusMessage, message: errorMessageNotFound, data: finalResponse});

                        } else {
                            //Log
                            logger.info('Failure response from openWeatherApi for city: ' + req.query.cityName);

                            errorMessage = _invalidCityName.replace('{{city}}', req.query.cityName);
                            //Return response in json format
                            res.status(_error);
                            res.json({status: _errorStatusMessage, message: errorMessage, data: finalResponse});

                        }
                    } else {
                        //Log
                        logger.info('OpenWeatherApi call failed for city: ' + req.query.cityName);
                        failureMessage = _forecastApiFailure.replace('{{city}}', req.query.cityName);
                        //Return response in json format
                        res.status(_error);
                        res.json({status: _errorStatusMessage, message: failureMessage});

                    }
                }
            });

        } else {
            //Log
            logger.info('Insufficient parameters provided');
            //Return response in json format
            res.status(_bad);
            res.json({status: _invalidStatusMessage, message: _insufficientMessage});

        }


    } catch (error) {
        //Log
        logger.error('Exception occurred while fetching current weather details for city: ' + req.query.cityName);

        //Return response in json format 
        res.status(_error);
        res.json({status: _errorStatusMessage, message: _forecastApiFailure});
    }
};

