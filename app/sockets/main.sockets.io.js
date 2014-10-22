'use strict';

var http = require('http');
var socketio = require('socket.io');

module.exports = function(app) {
	var server = http.createServer(app);
	var io = socketio.listen(server);
	app.set('socketio', io);
	app.set('server', server);
	//console.log(app);

  	var Twit = require('twit');

	var T = new Twit({
	    consumer_key: 'ScAWQEFTmpTkcH7VRFIlIcr5u', 
	    consumer_secret: 'yPDdCfc6ND5xkbVKp8GCYVCL7nQgdAQKwp16sjeyJolAizDiIm',
	    access_token: '1720403288-Fs93OwLNUxAYXGjHGiNRSElW7Loxb4ittHdwuAT',
	    access_token_secret: 'ebvvQ5rNq4tVbpzUncwGLAp0ZhLaTtZL5kq4Gnsyt4zMf'
	});

	T.get('statuses/user_timeline', { screen_name:'MayAqG', count: 10 }, function(err, data, response) {
	  //console.log(data);
	});

	io.sockets.on('connection',function(client){
		console.log('client connected...');
		client.on('tweet',function(client){
			console.log('Tweet requested');
		});

	});
	

};