app.service('userService', function($http) {
    
    var self = this;
    var user = {};
    this.updateProfileInfo = function(profile) {
        return $http.put('/users', profile)
            .then(function(result) {
            user = result.data;
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    this.refreshUser = function() {
        return $http.get('/users')
            .then(function(result) {
            user = result.data;
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    this.currentUser = function(){
        return user;
    }
    
    this.uploadImage = function(imageData) {
        return $http.post('/uploadImage', imageData)
//            .then(function(result) {
//                console.log(result);
//            }, function(err) {
//                console.log(err);
//        })   
    }
    
    this.updateCover = function(filePath) {
        console.log(filePath);
        return $http.put('/usercover', {url: filePath})
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    this.updateProfile = function(filePath) {
        console.log(filePath);
        return $http.put('/userprofile', {url: filePath})
            .then(function(result) {
                return result;
            }, function(err) {
                console.log(err);
        })
    }
    
    this.getAll = function() {
        return $http.get('/usersList')
    }
    
    this.getOne = function(user) {
        return $http.get('/userx/' + user);
    }
    
    this.followUser = function(userToFollow) {
        self.getOne(userToFollow)
            .then(function(result) {
                var userObj = result.data;
                return $http.put('/follow', {user: userObj} )
            }, function(err) {
                console.log(err);
        })
        
//        return $http.put('/follow', {user: userObj})
//            .then(function(result) {
//                return result;
//            }, function(err) {
//                console.log(err);
//        })
    }
    
    
//    this.getSelectedUser = function(user) {
//        return $http.get('/userx')
//            .then(function(result) {
//                return result;
//            }, function(err) {
//                console.log(err);
//        })
//    } 
    
})

/*method: 'POST',
            url: '/uploadImage',
            data: imageData
});
*/