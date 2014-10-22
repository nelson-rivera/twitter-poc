'use strict';


http = require('http');
socketio = require('socket.io');

var server = http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);