app.service('userService', function($http) {
    
    this.updateProfileInfo = function(profile) {
        return $http.put('/users', profile)
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    this.refreshUser = function() {
        return $http.get('/users')
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
})