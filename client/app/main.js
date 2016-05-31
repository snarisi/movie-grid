angular.module('movieGrid', ['ui.router'])
	.config(function ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/movies/1');
	});
