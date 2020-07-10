var http = require('http');

const server = http.createServer(function(req,res){

	console.log(res.url);
});