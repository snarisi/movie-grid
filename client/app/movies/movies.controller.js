'use strict';

angular.module('movieGrid').controller('MoviesCtrl', function ($scope, movies) {
	$scope.movies = movies.results;
	$scope.page = {
		current: movies.page,
		total: movies.total_pages
	};

	$scope.posterUrl = function (path) {
		if (!path) return 'images/poster_placeholder.jpg';

		return `http://image.tmdb.org/t/p/w185${path}`;
	};

	$scope.modalInfo = {
		index: null,
		movie: null
	};

	$scope.openModal = function (idx) {
		$scope.modalInfo.index = idx;
		$scope.modalInfo.movie = $scope.movies[idx];
	};

	$scope.closeModal = function () {
		$scope.modalInfo.movie = null;
	};

	$scope.nextModal = function () {
		$scope.modalInfo.index = ($scope.modalInfo.index + 1) % $scope.movies.length;
		$scope.modalInfo.movie = $scope.movies[$scope.modalInfo.index];
	};
});
