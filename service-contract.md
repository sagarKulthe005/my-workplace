### Service contract(s)

## 1. Current weather details
   Input Contract: To get current weather deatials of any city requestor need to pass 'cityName' as a query parameter with city name as    value to it.<br />
   Format: http://localhost:3000/api/currentWeatherDetails?cityName={{value}}<br />
   e.g- ```http://localhost:3000/api/currentWeatherDetails?cityName=London```<br />
   
   Output Contract: Requestor will get output in JSON format.<br />
   Format: Below is the format for response JSON from this api,<br />
   response: {<br />
              "status":"/Can be 'success'or 'error' or 'invalid'or 'not found' as per request completion status/",<br />
              "message":"/string message from api/",<br />
              "data":"/It will contain current weather data in json format/"<br />
             }
   
## 2. 5 days/3 hour forecast details
   Input Contract: To get current weather deatials of any city requestor need to pass 'cityName' as a query parameter with city name as    value to it.<br />
   Format: http://localhost:3000/api/forecastDetails?cityName={{value}}<br />
   e.g- ```http://localhost:3000/api/forecastDetails?cityName=London```<br />
   
   Output Contract: Requestor will get output in JSON format.<br />
   Format: Below is the format for response JSON from this api,<br />
   response: {<br />
              "status":"/Can be 'success'or 'error' or 'invalid'or 'not found' as per request completion status/",<br />
              "message":"/string message from api/",<br />
              "data":"/It will contain 5 days/3 hour forecast data in json format/"<br />
             }
   
