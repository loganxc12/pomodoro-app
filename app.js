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
                templateUrl: 'views/sign-up.html'
        })
        .state('dash', {
                url: '/dash',
                templateUrl: 'views/dash.html'
        })
        .state('stats', {
                url: '/stats',
                templateUrl: 'views/stats.html'
        })
    
})