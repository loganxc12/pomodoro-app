app.controller('modalCtrl', function($scope, close, profile, userService) {
    var modalScope = $scope;
    $scope.close = close;
    $scope.profile = profile;
    $scope.user = userService.currentUser();
//    $scope.namePlaceholder = $scope.user.name;
//    $scope.websitePlaceholder = $scope.user.website;
//    $scope.bioPlaceholder = $scope.user.bio;
    $scope.profile = {
        name: $scope.user.name,
        website: $scope.user.website,
        bio: $scope.user.bio
    }
    $scope.modalCoverPic = $scope.user.coverPic;
    $scope.modalProfilePic = $scope.user.profilePic;
    //code to update css for pictures
    console.log('updating background image', $scope.modalCoverPic);
//    $('#modal-cover-pic').css('background-image', 'url: ("'+$scope.modalCoverPic+'")');
//    $('.edit-cover-pic').css('background-color', 'red');
    
    //RELOAD CURRENT ROUTE
    $scope.reloadPage = function() {
        window.location.reload();
    }
    
    $scope.updateProfile = function() {
        
        userService.updateProfileInfo($scope.profile)
        .then(function(result) {
            close();
        })
    }
     
    $scope.setupUploadEvent = function() { 
        console.log('SET UP EVENT')
        $('#profile-upload').change(function(event) {
            console.log('File: ', event.target.files[0]);
            //Make a file reader
            var fileReader = new FileReader();
            //Tell what to do when it has loaded
            fileReader.onload = function(loaded) {
                //Once loaded, run this code
                console.log(loaded);

                var newFile = {
                    fileName: event.target.files[0].name,
                    fileBody: loaded.target.result
                };
                userService.uploadImage(newFile).then(function(data) {
                    console.log('uploaded: ', data);
                    
                    //Update User Here....
                    
                }).catch(function(err) {
                    console.error('upload err: ',err);
                });

            };

            fileReader.readAsDataURL(event.target.files[0]);
        });
    }
     

})