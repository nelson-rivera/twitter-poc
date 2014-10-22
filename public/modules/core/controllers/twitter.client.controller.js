'use strict';

angular.module('core').controller('TweetCtrl', ['$scope', 'socket',
	function TweetCtrl ($scope, socket) {
		$scope.btnIsDisabled = false;
		$scope.btnText = 'Twitter search';

		socket.on('message',function(data){
			alert(data.hello);
		});
		
		$scope.findTweets = function findTweets() {
			socket.emit('tweet', 'test');
			$scope.btnText = "Searching...";
			alert('Here should send both twitter users');	
		}
	}
]);

