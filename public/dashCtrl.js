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
                console.log(result.data);
                var milInDay = 1000 * 60 * 60 * 24;
                var currentDate = new Date().getTime();
                var midnight = new Date().setHours(0, 0, 0, 0);
                var weekAgo = midnight - milInDay * 7;
                var monthAgo = midnight - milInDay * 30;
                $scope.today = [];
                $scope.week = [];
                $scope.month = [];
            for (var i = 0; i < result.data.length; i++) {
                if (Date.parse(result.data[i].timeCompleted) > midnight) {
                    $scope.today.push(result.data[i]);
                } 
                if (Date.parse(result.data[i].timeCompleted) > weekAgo) {
                    $scope.week.push(result.data[i]);
                }
                if (Date.parse(result.data[i].timeCompleted) > monthAgo) {
                    $scope.month.push(result.data[i]);
                }
                
            }
        })
    }
    
}]);


