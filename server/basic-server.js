var http = require("http");
var handleRequest = require("./request-handler");
var urlParser = require("url");

var port = 3000;

var ip = "127.0.0.1";

var server = http.createServer(function(request, response){
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parts = urlParser.parse(request.url);

  if(parts.pathname === '/classes/chatterbox'){
    handleRequest(request, response);
  }else {
    //error handle
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
