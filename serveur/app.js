// npm init
// npm install express --save
// npm install socket.io --save
/********************************/
var express = require('express');
var app = require('express')();
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

var scanner = io.of('/'); 

app.get('/', function(req, res){
	res.sendFile(__dirname + "/" + "index.html");
});
app.get('/esp8266', function(req, res){
	res.sendFile(__dirname + "/" + "esp8266.html");
});
app.get('/esp32', function(req, res){
	res.sendFile(__dirname + "/" + "esp32.html");
});

scanner.on('connection', function(socket) {

    console.log('Scanner Connected');
 
// De l'ESP32 vers client
//=========================
    socket.on('esp32', function(msg) {
	console.log(msg);
	scanner.emit('message32', msg);	
    });
// Du client vers ESP32
//=========================
    socket.on('controleLed32', function(msg) {
	console.log(msg);
	scanner.emit('led32', msg);	
    });
// De l'ESP8266 vers Client
//=============================
    socket.on('esp8266', function(msg) {
	console.log(msg);
	scanner.emit('message8266', msg);	
    });
// Du client vers ESP8266
//=========================
    socket.on('controleLed8266', function(msg) {
	console.log(msg);
	scanner.emit('led8266', msg);	
    });    

    socket.on('disconnect', function() {
        console.log('Scanner Disconnected');
    });
	
});
//initialement 3000
http.listen(3000, function() {
    console.log('listening on *:3000');
});