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
			var responseArray=[];
			var twentyDaysObject={};
			var now = moment();
			for(var i=0; i<15; i++){
				now.subtract(i, 'days');
				twentyDaysObject[now.format("MM/DD/YYYY")]=0;
				var now = moment();
			}
			
			T.get('statuses/user_timeline', { screen_name: users.user1, count: 1000 }, function(err, data, response) {
					
				if(data!=undefined){
					data.forEach(function(tweet){
						var createdAt = moment(new Date(tweet.created_at));
						var createdAtString=createdAt.format("MM/DD/YYYY");
						if(createdAtString in twentyDaysObject){
							twentyDaysObject[createdAtString]++;
						}
					});
				}
				for(var key in twentyDaysObject){
					responseArray.push({user: users.user1, date: key, count: twentyDaysObject[key]});
					twentyDaysObject[key]=0;
				}
				T.get('statuses/user_timeline', { screen_name: users.user2, count: 1000 }, function(err, data, response) {
					
					if(data!=undefined){
						data.forEach(function(tweet){
							var createdAt = moment(new Date(tweet.created_at));
							var createdAtString=createdAt.format("MM/DD/YYYY");
							if(createdAtString in twentyDaysObject){
								twentyDaysObject[createdAtString]++;
							}
						});
					}
					for(var key in twentyDaysObject){
						responseArray.push({user: users.user2, date: key, count: twentyDaysObject[key]});
					}
					console.log(responseArray);
					client.broadcast.emit('usersChange',users);
					client.broadcast.emit('genChart', responseArray);
				});
				
			});
		  	
			
		});

	});
	

};