'use strict';

angular.module('core').controller('TweetCtrl', ['$scope', 'socket',
	function TweetCtrl ($scope, socket) {
		$scope.btnIsDisabled = false;
		$scope.btnText = 'Twitter search';

		$scope.graphData = [
			{
			    "Month": "Jan-11",
			    "storeId": 1,
			    "Sales": 14
			  },{
			    "Month": "Feb-11",
			    "storeId": 1,
			    "Sales": 14
			  },{
			    "Month": "March-11",
			    "storeId": 1,
			    "Sales": 17
			  },{
			    "Month": "Jan-11",
			    "storeId": 2,
			    "Sales": 14
			  },{
			    "Month": "Feb-11",
			    "storeId": 2,
			    "Sales": 16
			  },{
			    "Month": "March-11",
			    "storeId": 2,
			    "Sales": 8
			  }
		];


		$scope.findTweets = function findTweets() {
			var users={user1:$scope.user1,user2:$scope.user2};
			socket.emit('tweetRequest', users);
			$scope.btnText = "Searching...";
		};
		socket.on('usersChange',function(data){
			$scope.user1=data.user1;
			$scope.user2=data.user2;	
		});
		socket.on('genChart',function(data){
			console.log(data);
			alert("termino");	
		});
	}
]);

