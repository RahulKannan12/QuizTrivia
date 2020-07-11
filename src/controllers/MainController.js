app.controller('MainController',function($scope, $http){
    //$scope.welcomeMessage = "Hello ! Welcome to angularJs app";
    $http({
        method: 'GET',
        url: 'http://jservice.io/api/clues'
      }).then(function successCallback(response) {
        $scope.welcomeMessage = response.data[0];
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
})