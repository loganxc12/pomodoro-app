app.service('loginService', function($http, $state) {
    
    this.createNewUser = function(user) {
        return $http.post('/register/', user)
            .then(function(result) {
                console.log(result);
                if (result.status == 200) {
                $state.go('dash');
            }
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
//    this.identifyUser = function() {
//        return $http.get('/login'/).then()
//    }
    
    this.logMeIn = function(user) {
        return $http.post('/login', user)
            .then(function(result) {
                console.log(result);
                if (result.status == 200) {
                $state.go('dash');
              }
                return result;
            }, function(err) {
                console.log(err);
        })  
    }
    
});