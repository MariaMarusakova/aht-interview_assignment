const http = require("http");
const client = require('./db.js')
const {pool} = require("./db");

const host = 'localhost';
const port = 8000;

// Ajv library is used to validate data against json schema
const Ajv = require("ajv");
const telemetrySchema = {
    type: "object",
    properties: {
        locationID: {type: "number"},
        locationAddress: {type: "string"},
        currentTemp: {type: "number"},
        status: {type: "boolean"}
    },
    required: ["locationID", "locationAddress", "currentTemp"],
};

const requestListener = function(request, response) {
    response.setHeader("Content-Type", "application/json");
    const ajv = new Ajv();
    switch (request.url) {
        case "/telemetry":

            if (request.method == 'POST') {

                var body = ''
                request.on('data', function(data) {
                    body += data
                })
                request.on('end', function() {

                    // run data against schema defined in telemetrySchema.js
                    const parsedRequest = JSON.parse(body);
                    const isValidEntry = ajv.validate(telemetrySchema, parsedRequest);
                    if (isValidEntry) {
                        console.log("Valid POST request.");

                        //insert into DB

                        try {
                            pool.query(
                                "INSERT INTO measured_data (locationID, locationAddress,currentTemp) VALUES ($1, $2, $3)",
                                [parsedRequest.locationID, parsedRequest.locationAddress, parsedRequest.currentTemp]
                            );
                            console.log(`Added a data point. LocationId: ${parsedRequest.locationID}, locationAddress: ${parsedRequest.locationAddress}, currentTemp: ${parsedRequest.currentTemp}`);
                        } catch (error) {
                            console.error(error)
                        }

                        response.writeHead(200, {
                            'Content-Type': 'application/json'
                        })
                        response.end('Received: ' + body)



                    } else {
                        console.error("Invalid POST request. Errors:", ajv.errors);
                        response.writeHead(404);
                        response.end(JSON.stringify({
                            error: "Data has the wrong format."
                        }));
                    }

                })



            } else {
                response.end(JSON.stringify({
                    message: "Telemetry Endpoint found, but I only accept POST method."
                }));
            }

            break
        default:
            response.writeHead(404);
            response.end(JSON.stringify({
                error: "Source not found"
            }));
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
