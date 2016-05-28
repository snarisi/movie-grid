angular.module('movieGrid').config(function ($stateProvider) {
	$stateProvider.state('movies', {
		url: '/movies/:page',
		controller: 'MoviesCtrl',
		templateUrl: 'movies/movies.html',
		resolve: {
			movies: function (Movies, $stateParams) {
				return Movies.getPage($stateParams.page);
			}
		}
	})
});
