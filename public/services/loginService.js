app.service('loginService', function($http) {
    
    this.getUser = function(email) {
        return $http.get('/users/' + email)
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
});