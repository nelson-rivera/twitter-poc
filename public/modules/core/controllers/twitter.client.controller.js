'use strict';

angular.module('core').controller('TweetCtrl', ['$scope', 'socket',
	function TweetCtrl ($scope, socket) {
		$scope.tweets = [];
		$scope.btnIsDisabled = false;
		$scope.btnText = 'Find Tweets From San Francisco';

		$scope.findTweets = function findTweets() {
			socket.emit('tweetRequest', 'test');
			alert('Here should send both twitter users');	
		}
	}
]);

