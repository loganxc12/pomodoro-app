app.controller('pomCtrl', function($scope) {
    $scope.poms = [];
    $scope.addPom = function() {
        $scope.poms.push({completed: true, timeCompleted: new Date()})
    }
})