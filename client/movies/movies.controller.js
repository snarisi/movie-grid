'use strict';

angular.module('movieGrid').controller('MoviesCtrl', function ($scope, movies) {
	$scope.movies = movies.results;
	$scope.page = {
		current: movies.page,
		total: movies.total_pages
	};

	$scope.posterUrl = function (path) {
		return `http://image.tmdb.org/t/p/w185${path}`;
	}
});
