

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


// create a function 
/**
 *  req: request obj
 *  resp: response obj
 *  next : to call the next middleware in the chain 
 *
 */ 
var auth = function  (req, resp, next ){
	console.log(req.headers); 
	// extract the authorization header 
	var authHeader = req.headers.authorization; 
	
	// if is it null 
	if (!authHeader) {
		var err = new Error ('You must use authorization (Basic)'); 
		err.status = 401; 
		next (err) ; // call the Error Middleware 
		return; 
	}

	// format 
	// Basic xybhhhhh:33333ddd
	// end of format 
	var auth 	= new Buffer (authHeader.split(' ')[1], 'base64').toString().split(':'); 
	var user  	= auth[0]; 
	var passwd 	= auth[1]; 

	if ( user == 'admin' && passwd == 'password'){
		next(); // athorization successfull
	} else {

		var err = new Error ('Yoou are not athenticated!'); 
		err.status = 401; 
		next (err); 
	}
}

//
// start the middleware for authentication 
app.use(auth); 

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


