app.controller('dashCtrl', ['$scope','$timeout', 'pomodoroService',
    function($scope, $timeout, pomodoroService) {
        
    //Format time 
    $scope.formatTime = function(num) {
        var minutes = Math.floor(num / 60);
        var seconds = num % 60;
        if (seconds < 10) {
            $scope.prettyCount = minutes + ":0" + seconds;
        } else {
            $scope.prettyCount = minutes + ":" + seconds;
        }
    }
    
    //Coutdown timer//
    $scope.counter = 5;
    $scope.prettyCount = '25' + ":" + '00';
    var stopped;
        
    $scope.countdown = function() {
        stopped = $timeout(function() {
            console.log($scope.counter);
            $scope.counter--;
            if ($scope.counter === -1) {
                alert("Time's Up!");
                $scope.counter = 1500;
                $scope.prettyCount = '25' + ":" + '00';
                $scope.togglePlayButton();
                $scope.addPom();
                $scope.getPoms();
                return;
            }
            $scope.formatTime($scope.counter);
            $scope.countdown();   
        }, 1000);
    };
     
    $scope.stopTimer = function(){
        $timeout.cancel(stopped);
    } 
    
    //Play/Stop buttons
    $scope.play = true;
    $scope.stop = false;
    $scope.togglePlayButton = function() {
        $scope.play = !$scope.play;
        $scope.stop = !$scope.stop;
    }
    
    //Toggle Sidebar
    $scope.sidebar = false;
    $scope.toggleSidebar = function() {
        $scope.sidebar = !$scope.sidebar;
    }
    
    //Color Setting Buttons
    $scope.settingBtns = false;
    $scope.toggleSettings = function() {
        $scope.settingBtns = !$scope.settingBtns;
    }
    
    //Add New Pom 
    $scope.addPom = function() {
        pomodoroService.addPom().then(function(result) {
            console.log(result);
        })
    }
    
    //Get Pom Data
    $scope.getPoms = function() {
        pomodoroService.getPoms()
            .then(function(result) {
                console.log('RESULT -->' + result);
                $scope.today = result.today;
                $scope.week = result.week;
                $scope.month = result.month;
        })
    }
    
    $( document ).ready(function() {
        $('#white-btn').click(function() {
            $('.timer-background').css('background-color', 'white');
            $('.timer h1').css('color', '#475159');
            $('.settings i').css('color', '#475159');
        })
    });
    

    
}]);


