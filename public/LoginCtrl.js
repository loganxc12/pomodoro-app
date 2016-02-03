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
                if (result.status == 200) {
                    console.log(result);
                    alertify.set('notifier','position', 'bottom-left');
                    alertify.success('You are logged in!');
            } else {
                console.error(result);
                alertify.error('Could not authenticate user');
        }
    })
    }
    
})