app.service('pomodoroService', function($http) {
    
    this.addPom = function() {
        return $http.post('/poms', {completed: true, timeCompleted: new Date(), user: "56b114d2120bdacb03e9b9fe"})
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })  
    }
    
    this.getPoms = function() {
        return $http.get('/poms')
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    
})