const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
	res.setHeader("Content-Type", "application/json");
	switch (req.url){
			case "/telemetry":
		            res.writeHead(200);
			    res.end(JSON.stringify({message:"Telemetry Endpoint found"}));
	                   break
			default: 
			   res.writeHead(404);
			   res.end(JSON.stringify({error:"Source not found"}));
	}
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
