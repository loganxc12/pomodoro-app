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
                controller: 'dashCtrl'
        })
        .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
        })
    
})

$(document).ready(function() {
    $('#blue-btn').click(function() {
        console.log('ran function');
        $('.timer-background').css('background-color', 'dodgerblue');
    })
});