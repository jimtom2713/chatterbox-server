var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var sendResponse = function(response, data ,statusCode){
  var statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
}

var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback( JSON.parse(data));
  });
}
var objectId = 1;
var messages = [
  {
    text: "tacocat",
    username: "whatever name"
  }
];

var actions = {
  'GET': function(request, response){
    sendResponse(response, {results:messages});
  },
  'POST': function(request, response){
    collectData(request, function(message){
      messages.push(message);
      message.objectId = ++objectId;
      sendResponse(response, {objectId: 1});
    });
  },
  'OPTIONS': function(request, response){
    sendResponse(response, null);
  }
}

module.exports = function(request, response) {

  var action = actions[request.method];
  if( action ){
    action(request, response);
  }else{
    sendResponse(response, "Not Found", 404);  }

};


