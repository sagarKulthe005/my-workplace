### Weather-Api
This is node base service which uses express as well as http module. This api provides two services to outside world as listed below
1. Current weather details.
2. 5 days/3 hour forecast details.
This service consumes a third party weather service (http://openweathermap.org/api) to get data from it as per city name provided.

## Getting Started
To launch this service user need to first of all run ```npm install``` to install all packages this node api requires.Once all packages successfully installed user can run gulp task ``` gulp start-app ``` to launch this api. 

## Linting
To lint this applications code user need to run gulp task ```gulp lint ```. This will check all code written for this service using ```gulp-jslint``` package and provide errors if any.

## Styling
To check code style for this applications code user need to run gulp task ```gulp style ```. This will analyse whole code using ```gulp-jscs``` package and provide errors if any coding style related point detected.

## Unit Testing
```Mocha``` framework is used for unit testing this api. User need to run ```gulp test``` gulp task to do unit testing. It run all test cases written in test file and show summary with test case status.

## Documentation
Code documentation is generated using ```gulp-jsdoc3``` package. It is already done and if user want see it then he/she will need to open ```\docs\gen\global.html``` in browser. On this page user will see documetation for this service. If any change ocurres in future in this service and user need to update document then user simply need to run gulp task ```gulp doc``` and document will get updated.

## Hooks
Whenever any programmer working on this api will try to commit any changes made to this api to git repository then before commiting ```pre-commits hooks``` will run to check lint,style and test all are passed or not. If everything is passed then only commit will happen else it will stop git commit task. ```precommit-hook``` package is used for implementing these hooks.

