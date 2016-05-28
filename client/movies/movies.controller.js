'use strict';

angular.module('movieGrid').controller('MoviesCtrl', function ($scope, movies) {
	$scope.movies = movies.results;
	$scope.page = movies.page;
	$scope.totalPages = movies.total_pages;

	$scope.posterUrl = function (path) {
		return `http://image.tmdb.org/t/p/w342${path}`;
	}

	console.log(movies);
});
