## Service contract(s)

## 1. Current weather details
   Input Contract: To get current weather deatials of any city requestor need to pass 'cityName' as a query parameter with city name as value to it.
   Format: http://localhost:3000/api/currentWeatherDetails?cityName={{value}}
   e.g- ```http://localhost:3000/api/currentWeatherDetails?cityName=London```
   
   Output Contract: Requestor will get output in JSON format.
   Format: Below is the format for response JSON from this api,
   response: {
              "status":"/** Can be 'success'or 'error' or 'invalid'or 'not found' as per request completion status*/",
              "message":"/**string message from api*/",
              "data":"/**It will contain current weather data in json format*/"
             }
   
## 2. 5 days/3 hour forecast details
   Input Contract: To get current weather deatials of any city requestor need to pass 'cityName' as a query parameter with city name as value to it.
   Format: http://localhost:3000/api/forecastDetails?cityName={{value}}
   e.g- ```http://localhost:3000/api/forecastDetails?cityName=London```
   
   Output Contract: Requestor will get output in JSON format.
   Format: Below is the format for response JSON from this api,
   response: {
              "status":"/** Can be 'success'or 'error' or 'invalid'or 'not found' as per request completion status*/",
              "message":"/**string message from api*/",
              "data":"/**It will contain 5 days/3 hour forecast data in json format*/"
             }
   