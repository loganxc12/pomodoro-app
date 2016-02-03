app.controller('loginCtrl', function($scope, loginService) {
   
    $scope.createUser = function() {
        loginService.createNewUser($scope.user)
            .then(function(result) {
                console.log(result);
        })
    }
    
    $scope.login = function() {
        loginService.logMeIn($scope.user)
            .then(function(result) {
                console.log(result);
        })
    }
    
    
})