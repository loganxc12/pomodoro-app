app.controller('statsCtrl', function($scope, pomodoroService) {
    
    //JQUERY SIDEBAR NAV
        
        $('.nav-sidebar').scotchPanel({
            containerSelector: 'body', // Make this appear on the entire screen
            direction: 'left', // Make it toggle in from the left
            duration: 300, // Speed in ms how fast you want it to be
            transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
            clickSelector: '.hamburger', // Enables toggling when clicking elements of this class
            distanceX: '200px', // Size fo the toggle
            enableEscapeKey: true // Clicking Esc will close the panel
        });
    
//    //Toggle Sidebar
//    $scope.sidebar = false;
//    $scope.toggleSidebar = function() {
//        $scope.sidebar = !$scope.sidebar;
//    }
    
    //Get Pom Data (FOR TOP NUMBER SECTION)
    $scope.getPoms = function() {
        pomodoroService.getPoms()
            .then(function(result) {
                console.log('RESULT -->' + result);
                $scope.bannerToday = result.today;
                $scope.bannerWeek = result.week;
                $scope.bannerMonth = result.month;
        })
    }
    
    //Get Pom Data (FOR BAR GRAPH)
    $scope.getBarPoms = function() {
        pomodoroService.getBarPoms()
            .then(function(result) {
                console.log('BAR RESULT -->' + result);
                $scope.today = result.today;
                $scope.yesterday = result.yesterday;
                $scope.twoDaysAgo = result.twoDaysAgo;
                $scope.threeDaysAgo = result.threeDaysAgo;
                $scope.fourDaysAgo = result.fourDaysAgo;
                $scope.fiveDaysAgo = result.fiveDaysAgo;
                $scope.sixDaysAgo = result.sixDaysAgo;
                $scope.sevenDaysAgo = result.sevenDaysAgo;
                $scope.eightDaysAgo = result.eightDaysAgo;
                $scope.nineDaysAgo = result.nineDaysAgo;
            initGraph();
        })
    }
    
    function initGraph(){ 
        
        var tdy = moment().format("MMM D").toUpperCase();
        var ysterdy = moment().subtract(1, 'days').format("MMM D").toUpperCase();
        var ago2 = moment().subtract(2, 'days').format("MMM D").toUpperCase(); 
        var ago3 = moment().subtract(3, 'days').format("MMM D").toUpperCase(); 
        var ago4 = moment().subtract(4, 'days').format("MMM D").toUpperCase(); 
        var ago5 = moment().subtract(5, 'days').format("MMM D").toUpperCase(); 
        var ago6 = moment().subtract(6, 'days').format("MMM D").toUpperCase(); 
        var ago7 = moment().subtract(7, 'days').format("MMM D").toUpperCase(); 
        var ago8 = moment().subtract(8, 'days').format("MMM D").toUpperCase();
        var ago9 = moment().subtract(9, 'days').format("MMM D").toUpperCase(); 
        var data = {
    labels: [ago9, ago8, ago7, ago6, ago5, ago4, ago3, ago2, "YESTERDAY", "TODAY"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(55, 182, 80, 0.4)",
            strokeColor: "rgba(55, 182, 80, 1)",
            highlightFill: "rgba(55, 182, 80, 0.8)",
            highlightStroke: "rgba(55, 182, 80, 1)",
            data: [$scope.nineDaysAgo.length, $scope.eightDaysAgo.length, $scope.sevenDaysAgo.length, $scope.sixDaysAgo.length, $scope.fiveDaysAgo.length, $scope.fourDaysAgo.length, $scope.threeDaysAgo.length, $scope.twoDaysAgo.length, $scope.yesterday.length, $scope.today.length]
        }
    ]
};
    
    var options = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,0.0)",
        
    scaleLineColor: 'transparent',

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,
        
    scaleShowLabels: false,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: false,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 7,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

}
    
    var ctx = document.getElementById("myChart").getContext("2d");
        var myNewChart = new Chart(ctx).Line(data, options, {
            showScale: false,
        });
        
//        $scope.toggleGraph = function() {
////        $scope.barGraph = !$scope.barGraph;
////        $scope.lineGraph = !$scope.lineGraph;
//        ctx = document.getElementById("myChart").getContext("2d");
//        var myBarChart = new Chart(ctx).Bar(data, options, {
//            showScale: false,
//        });
//    }
    }
    
    //TOGGLE GRAPH VIEW
    $scope.barGraph = false;
    $scope.lineGraph = true;
    
        

    
    
})

