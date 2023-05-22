const http = require("http");
const client = require('./db.js')


const host = 'localhost';
const port = 8000;

// basic authentication
var setUsername = "username";
var setPassword = "password";

// Ajv library is used to validate data against json schema
const Ajv = require("ajv");

const {telemetrySchema} = require('./schema');
const {insertIntoDB} = require('./insert');

const requestListener = function(request, response) {
    response.setHeader("Content-Type", "application/json");
    const ajv = new Ajv();
    switch (request.url) {
        case "/telemetry":

            //get the username and password from the request and check it
            var encoded = request.headers.authorization.split(' ')[1];
            var decoded = Buffer.from(encoded, 'base64').toString();
            var username = decoded.split(':')[0];
            var password = decoded.split(':')[1];
            if (username == setUsername && password == setPassword) {

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
                            insertIntoDB(response, body, parsedRequest.locationID, parsedRequest.locationAddress, parsedRequest.currentTemp);
                        } else {
                            console.error("Invalid POST request. Errors:", ajv.errors);
                            response.writeHead(404);
                            response.end(JSON.stringify({
                                error: "Data has the wrong format."
                            }));
                        }

                    })



                } else {
                    console.error("Telemetry Endpoint found, but I only accept POST method.");
                    response.writeHead(404);
                    response.end(JSON.stringify({
                        message: "Telemetry Endpoint found, but I only accept POST method."
                    }));
                }
            } else {
                console.error("Invalid User or Password");
                response.writeHead(404);
                response.end(JSON.stringify({
                    error: "Invalid User or Password"
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
