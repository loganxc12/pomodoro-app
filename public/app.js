var app = angular.module('pomodoroApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
        })
        .state('sign up', {
                url: '/sign-up',
                templateUrl: 'views/sign-up.html',
                controller: 'loginCtrl'
        })
        .state('dash', {
                url: '/dash',
                templateUrl: 'views/dash.html',
                controller: 'dashCtrl'
        })
        .state('stats', {
                url: '/stats',
                templateUrl: 'views/stats.html',
                controller: 'statsCtrl'
        })
        .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
        })
        .state('test', {
                url: '/test',
                templateUrl: 'views/test.html',
                controller: 'statsCtrl'
        })
    
})

//$(document).ready(function() {
//    
//    $(function () {
//    //Create a data object
//    var data = {
//    labels: ["January", "February", "March", "April", "May", "June", "July"],
//    datasets: [
//        {
//            label: "My First dataset",
//            fillColor: "rgba(220,220,220,0.2)",
//            strokeColor: "rgba(220,220,220,1)",
//            pointColor: "rgba(220,220,220,1)",
//            pointStrokeColor: "#fff",
//            pointHighlightFill: "#fff",
//            pointHighlightStroke: "rgba(220,220,220,1)",
//            data: [65, 59, 80, 81, 56, 55, 40]
//        },
//        {
//            label: "My Second dataset",
//            fillColor: "rgba(151,187,205,0.2)",
//            strokeColor: "rgba(151,187,205,1)",
//            pointColor: "rgba(151,187,205,1)",
//            pointStrokeColor: "#fff",
//            pointHighlightFill: "#fff",
//            pointHighlightStroke: "rgba(151,187,205,1)",
//            data: [28, 48, 40, 19, 86, 27, 90]
//        }
//    ]
//};
//    var option = {};
//    
//    //Get the context of the canvas element we want to select
//    var ctx = document.getElementById("barChart").getContext('2d');
//    var myLineChart = new Chart(ctx).Line(data, option);
//        
//    })
//});