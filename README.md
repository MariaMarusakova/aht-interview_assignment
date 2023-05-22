# AHT Interview Project


## Table of contents
* [Assignment](#assignment)
* [Technologies](#technologies)
* [Setup](#setup)

### Assignment
        1. Write an app that enables data ingestion via simple POST request using POST /telemetry endpoint. 
          a) The endpoint consumes the body
          b) validates the data against expected schema 
          c) stores it in a RDBMS, say PSQL.
        2. propose simple AUTH mechanism and implement it for the above endpoint.
        3. Implement automatic test case that does the testing of the implemented logic.
        4. Your work should be available via GitHub as a public repository, commit often

## Solution

### Technologies used
 * nodejs
 * avj
 * node-postgres
 
### Setup


* Create DB
  - log into Postgres shell using postgres user
  ```sudo -u postgres psql```

  - create new telemetry user
  ```CREATE USER telemetry WITH PASSWORD 'telemetry';```

  - create database for the new user
  ```CREATE DATABASE telemetry OWNER telemetry;```

  - to log into Postgress as the new user, create new user 
  ```sudo adduser telemetry```

  - open Postgres shell as the new user
  ```sudo -u telemetry psql -d telemetry```

  - create new table measured_data with 3 columns
      ```
      CREATE TABLE measured_data(
      id SERIAL PRIMARY KEY,
      locationID INT NOT NULL,
      locationAddress VARCHAR(50) NOT NULL,
      currentTemp INT NOT NULL)
      ;
      ```
    
* To run this project:
1. clone this repository
2. install dependencies ```$ npm install```
3. change into project directory ```$ cd aht-interview_assignment```
4. start db ```$ sudo service postgresql start```
5. start the server ```$ node server.js```

6.1 To test run ```$ curl -X  POST http://localhost:8000/telemetry  -H 'Content-Type: application/json' -d '{"locationID":1220,"locationAddress":"Mela-Köhler-Straße 6, 1220 Wien", "currentTemp":6}' --user "username:password"``` 


6.2 Or test In Postman
  * POST request on URL http://localhost:8000/telemetry
  * Body: {"locationID":1220,"locationAddress":"Mela-Köhler-Straße 16, 1220 Wien","currentTemp":7}
  * Authorisation - Basic Authorisation with username = 'username' and password = 'password' 

7. Check the DB 
```
$ sudo -u telemetry psql -d telemetry
telemetry-> SELECT * from measured_data;
```

