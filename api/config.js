"use strict";

var Config = function config() {
    //defining a var instead of this (works for variable & function) will create a private definition   
    var _self = this;
    //Port for application hosting
    _self.port = 3000;
    //Openweathermap api url
    _self.openWeatherMapUrl = 'http://api.openweathermap.org/data/2.5/';
    //Api for current weather
    _self.apiCurrentWeather = 'weather?q={{city}}&units=metric&apiKey=';
    //Api for forecast
    _self.apiForecast = 'forecast?q={{city}}&units=metric&apiKey=';
    //Openweathermap api url
    _self.openWeatherMapKey = '4099ff7d701a8cb1813d687744c52c65';
};

/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */
Config.instance = null;

/**
 * Singleton getInstance definition
 * @return singleton class
 */
Config.getInstance = function () {
    if (this.instance === null) {
        this.instance = new Config();

    }
    return this.instance;
};

module.exports = Config.getInstance();
