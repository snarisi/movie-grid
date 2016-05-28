'use strict';

angular.module('movieGrid').factory('Movies', function ($http, $q) {
	const factory = {};
	const pageCache = {};

	factory.getPage = function (page) {
		if (pageCache[page]) return $q.when(pageCache[page]);

		return $http.get(`/api/movies/${page}`)
			.then(res => {
				pageCache[page] = res.data;
				return res.data;
			});
	}

	return factory;
});
