'use strict';

var http = require('http');
var socketio = require('socket.io');
var moment = require('moment');

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

	

	io.sockets.on('connection',function(client){
		console.log('client connected...');
		client.on('tweetRequest',function(users){
			T.get('statuses/user_timeline', { screen_name:users.user1, count: 10 }, function(err, data, response) {
			  data.forEach(function(tweet){
			  	var created = moment(tweet.created_at);
			  	console.log(tweet.text+" --- "+created.format("MM/DD/YYYY"));	
			  	client.broadcast.emit('usersChange',users);
			  })
			  
			});
		});

	});
	

};