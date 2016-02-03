app.controller('loginCtrl', function($scope, loginService) {
    $scope.getUserId = function() {
        loginService.getUser($scope.userEmail).then(function(result) {
            console.log(result);
        })
    }
})