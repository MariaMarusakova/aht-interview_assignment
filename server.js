const http = require("http");
const client = require('./db.js')
const { pool } = require("./db");

const host = 'localhost';
const port = 8000;

const requestListener = function(request, response) {
	response.setHeader("Content-Type", "application/json");
	switch (request.url) {
		case "/telemetry":

			if (request.method == 'POST') {

				var body = ''
				request.on('data', function(data) {
					body += data
				})
				request.on('end', function() {
					response.writeHead(200, {
						'Content-Type': 'application/json'
					})
					response.end('Received: ' + body)
				})
				

				const locationID = 1220;
				const locationAddress = "Mela-Köhler-Straße 8, 1220 Wien";
				const currentTemp = 9;
				  try {
					  pool.query(
					      "INSERT INTO measured_data (locationID, locationAddress,currentTemp) VALUES ($1, $2, $3)",
					      [locationID, locationAddress, currentTemp]
					    );
					  console.log(`Added a data point. LocationId: ${locationID}, locationAddress: ${locationAddress}, currentTemp: ${locationID}`);
					  } catch (error) {
					    console.error(error)
					  }
			} else {
				response.end(JSON.stringify({
					message: "Telemetry Endpoint found, but I only accept POST method"
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
