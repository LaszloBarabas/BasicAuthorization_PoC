

// load express module
var express = require('express'); 

// load logging module 
var morgan = require('morgan'); 

// set the host name 
var hostname 	= 'localhost'; 
//set the port nr
var port 	= 3030; 


// create the general app context 
var app		= express(); 

// start the middleware 
app.use(morgan('dev')); 


//
// start the middleware for authentication 
//app.use(auth); 

// start the middleware for serving static files 
app.use(express.static(__dirname +'/public')); 

// Error handling Middleware 
app.use(function (req, resp, next) {
	resp.writeHeader(err.status || 500, 
		{
			'WWW=Authenticate':'Basic',
			'Content-Type':'text/plain'
		}); 
	resp.end(err.message); 
});  

// start the app 
app.listen( port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`); 
}); 


