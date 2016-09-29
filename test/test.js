"use strict";

//NodeJS in-built packages 
var request = require('request');
var expect = require("chai").expect;

//Global variables
var _apiBaseUrl = "http://localhost:3000/";
var _currentWeatherApi = "api/currentWeatherDetails";
var _forecastApi = "api/forecastDetails";

//Describe block for current weather api
describe("Current weather API", function () {

  //Api path
  var url = _apiBaseUrl + _currentWeatherApi;

  //it block for response status code 200
  it("returns status 200", function (done) {
    request(url + '?cityName=London', function (error, response, body) {
      //compare the api response with expected response
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  //it block for status code 200 from openWeatherApi
  it("returns current weather details", function (done) {
    request(url + '?cityName=London', function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.data.cod).to.equal(200);
      done();
    });
  });

  //it block for status code 404
  it("returns status 404", function (done) {
    request(url + '?cityName=pop098', function (error, response, body) {
      //compare the api response with expected response
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  //it block for status code 404 from openWeatherApi
  it("returns city not found error", function (done) {
    request(url + '?cityName=pop098', function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.data.cod).to.equal('404');
      done();
    });
  });

  //it block for status code 400
  it("returns status 400", function (done) {
    request(url, function (error, response, body) {

      //compare the api response with expected response
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  //it block for insufficient parameters request
  it("returns insufficient paramaters error", function (done) {
    request(url, function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.message).to.equal('insufficient parameters provided. Please provide city name');
      done();
    });
  });



});

//Describe block for current weather api
describe("5 days per 3 hours forecast API", function () {

  //Api path
  var url = _apiBaseUrl + _forecastApi;

  //it block for response status code 200
  it("returns status 200", function (done) {
    request(url + '?cityName=London', function (error, response, body) {
      //compare the api response with expected response
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  //it block for status code 200 from openWeatherApi
  it("returns current weather details", function (done) {
    request(url + '?cityName=London', function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.data.cod).to.equal('200');
      done();
    });
  });

  //it block for status code 404
  it("returns status 404", function (done) {
    request(url + '?cityName=pop098', function (error, response, body) {
      //compare the api response with expected response
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  //it block for status code 404 from openWeatherApi
  it("returns city not found error", function (done) {
    request(url + '?cityName=pop098', function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.data.cod).to.equal('404');
      done();
    });
  });

  //it block for status code 400
  it("returns status 400", function (done) {
    request(url, function (error, response, body) {

      //compare the api response with expected response
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  //it block for insufficient parameters request
  it("returns insufficient paramaters error", function (done) {
    request(url, function (error, response, body) {
      //parse the response
      var finalResponse = JSON.parse(body);
      //compare the api response with expected response
      expect(finalResponse.message).to.equal('insufficient parameters provided. Please provide city name');
      done();
    });
  });



});