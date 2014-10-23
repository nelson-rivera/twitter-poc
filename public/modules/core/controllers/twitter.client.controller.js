'use strict';

angular.module('core').controller('TweetCtrl', ['$scope', 'socket',
	function TweetCtrl ($scope, socket) {
		$scope.btnIsDisabled = false;
		$scope.btnText = 'Twitter search';

		


		$scope.findTweets = function findTweets() {
			$scope.btnIsDisabled = true;
			var users={user1:$scope.user1,user2:$scope.user2};
			socket.emit('tweetRequest', users);
			$scope.btnText = "Searching...";
		};
		socket.on('usersChange',function(data){
			$scope.user1=data.user1;
			$scope.user2=data.user2;	
		});
		socket.on('genChart',function(data){
			$scope.btnText = 'Twitter search';
			$scope.btnIsDisabled = false;
			$scope.responseJson=data;
			console.log(data);
			document.getElementById("chart-container").innerHTML = '';
			var svg = dimple.newSvg("#chart-container", 800, 600);
            


        	var dataDimple = dimple.filterData(data, "user", [$scope.user1, $scope.user2])
		   	var chart = new dimple.chart(svg, dataDimple);
		   	var x = chart.addCategoryAxis("x", "date");
		    x.addOrderRule("Date");
		   	chart.addMeasureAxis("y", "count");
		   	chart.addSeries([$scope.user1, $scope.user2], dimple.plot.line);
		   	chart.draw();

		});
	}
]);

