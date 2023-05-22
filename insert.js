const { pool } = require("./db");

const insertIntoDB = function (response, body, locationID, locationAddress, currentTemp) {
                            console.log("Valid POST request.");

                            //insert into DB

                            try {
                                pool.query(
                                    "INSERT INTO measured_data (locationID, locationAddress,currentTemp) VALUES ($1, $2, $3)",
                                    [locationID, locationAddress, currentTemp]
                                );
                                console.log(`Added a data point. LocationId: ${locationID}, locationAddress: ${locationAddress}, currentTemp: ${currentTemp}`);
                            } catch (error) {
                                console.error(error);
                            }

                            response.writeHead(200, {
                                'Content-Type': 'application/json'
                            })
                            response.end('Received: ' + body);
}

exports.insertIntoDB = insertIntoDB;
