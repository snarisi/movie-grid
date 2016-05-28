'use strict';

angular.module('movieGrid').factory('Movies', function ($http, $q) {
	const factory = {};
	const pageCache = {};
	const MAX_AGE = 36000000;

	const checkCache = function (page) {
		return pageCache[page] && (Date.now() - pageCache[page].time) <= MAX_AGE;
	};
	factory.getPage = function (page) {
		if (checkCache(page)) return $q.when(pageCache[page].data);

		return $http.get(`/api/movies/${page}`)
			.then(res => {
				pageCache[page] = { data: res.data, time: Date.now() };
				return res.data;
			});
	}

	return factory;
});
