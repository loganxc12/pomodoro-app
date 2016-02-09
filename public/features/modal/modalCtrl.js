app.controller('modalCtrl', function($scope, close, profile, userService) {
    $scope.close = close;
    $scope.profile = profile;
    
        $scope.updateProfile = function() {
        userService.updateProfileInfo($scope.profile)
        .then(function(result) {
            close();
        })
    }
        

})