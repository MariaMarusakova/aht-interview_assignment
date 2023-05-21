const http = require("http");
const client = require('./db.js')

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
