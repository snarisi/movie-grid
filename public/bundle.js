'use strict';

angular.module('movieGrid', ['ui.router']).config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/movies/1');
});

'use strict';

angular.module('movieGrid').controller('MoviesCtrl', function ($scope, movies) {
	$scope.movies = movies.results;
	$scope.page = movies.page;
	$scope.totalPages = movies.total_pages;

	$scope.posterUrl = function (path) {
		return 'http://image.tmdb.org/t/p/w185' + path;
	};

	console.log(movies);
});

'use strict';

angular.module('movieGrid').factory('Movies', function ($http, $q) {
	var factory = {};
	var pageCache = {};

	factory.getPage = function (page) {
		if (pageCache[page]) return $q.when(pageCache[page]);

		return $http.get('/api/movies/' + page).then(function (res) {
			pageCache[page] = res.data;
			return res.data;
		});
	};

	return factory;
});

angular.module('movieGrid').config(function ($stateProvider) {
	$stateProvider.state('movies', {
		url: '/movies/:page',
		controller: 'MoviesCtrl',
		templateUrl: 'movies/movies.html',
		resolve: {
			movies: function movies(Movies, $stateParams) {
				return Movies.getPage($stateParams.page);
			}
		}
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtb3ZpZXMvbW92aWVzLmNvbnRyb2xsZXIuanMiLCJtb3ZpZXMvbW92aWVzLmZhY3RvcnkuanMiLCJtb3ZpZXMvbW92aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsUUFBQSxNQUFBLENBQUEsV0FBQSxFQUFBLENBQUEsV0FBQSxDQUFBLEVBQ0EsTUFEQSxDQUNBLFVBQUEsa0JBQUEsRUFBQSxpQkFBQSxFQUFBO0FBQ0EsbUJBQUEsU0FBQSxDQUFBLElBQUE7QUFDQSxvQkFBQSxTQUFBLENBQUEsV0FBQTtBQUNBLENBSkE7O0FDQUE7O0FBRUEsUUFBQSxNQUFBLENBQUEsV0FBQSxFQUFBLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBO0FBQ0EsUUFBQSxNQUFBLEdBQUEsT0FBQSxPQUFBO0FBQ0EsUUFBQSxJQUFBLEdBQUEsT0FBQSxJQUFBO0FBQ0EsUUFBQSxVQUFBLEdBQUEsT0FBQSxXQUFBOztBQUVBLFFBQUEsU0FBQSxHQUFBLFVBQUEsSUFBQSxFQUFBO0FBQ0EsNENBQUEsSUFBQTtBQUNBLEVBRkE7O0FBSUEsU0FBQSxHQUFBLENBQUEsTUFBQTtBQUNBLENBVkE7O0FDRkE7O0FBRUEsUUFBQSxNQUFBLENBQUEsV0FBQSxFQUFBLE9BQUEsQ0FBQSxRQUFBLEVBQUEsVUFBQSxLQUFBLEVBQUEsRUFBQSxFQUFBO0FBQ0EsS0FBQSxVQUFBLEVBQUE7QUFDQSxLQUFBLFlBQUEsRUFBQTs7QUFFQSxTQUFBLE9BQUEsR0FBQSxVQUFBLElBQUEsRUFBQTtBQUNBLE1BQUEsVUFBQSxJQUFBLENBQUEsRUFBQSxPQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsSUFBQSxDQUFBLENBQUE7O0FBRUEsU0FBQSxNQUFBLEdBQUEsa0JBQUEsSUFBQSxFQUNBLElBREEsQ0FDQSxlQUFBO0FBQ0EsYUFBQSxJQUFBLElBQUEsSUFBQSxJQUFBO0FBQ0EsVUFBQSxJQUFBLElBQUE7QUFDQSxHQUpBLENBQUE7QUFLQSxFQVJBOztBQVVBLFFBQUEsT0FBQTtBQUNBLENBZkE7O0FDRkEsUUFBQSxNQUFBLENBQUEsV0FBQSxFQUFBLE1BQUEsQ0FBQSxVQUFBLGNBQUEsRUFBQTtBQUNBLGdCQUFBLEtBQUEsQ0FBQSxRQUFBLEVBQUE7QUFDQSxPQUFBLGVBREE7QUFFQSxjQUFBLFlBRkE7QUFHQSxlQUFBLG9CQUhBO0FBSUEsV0FBQTtBQUNBLFdBQUEsZ0JBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQTtBQUNBLFdBQUEsT0FBQSxPQUFBLENBQUEsYUFBQSxJQUFBLENBQUE7QUFDQTtBQUhBO0FBSkEsRUFBQTtBQVVBLENBWEEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ21vdmllR3JpZCcsIFsndWkucm91dGVyJ10pXG5cdC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL21vdmllcy8xJyk7XG5cdH0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbW92aWVHcmlkJykuY29udHJvbGxlcignTW92aWVzQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIG1vdmllcykge1xuXHQkc2NvcGUubW92aWVzID0gbW92aWVzLnJlc3VsdHM7XG5cdCRzY29wZS5wYWdlID0gbW92aWVzLnBhZ2U7XG5cdCRzY29wZS50b3RhbFBhZ2VzID0gbW92aWVzLnRvdGFsX3BhZ2VzO1xuXG5cdCRzY29wZS5wb3N0ZXJVcmwgPSBmdW5jdGlvbiAocGF0aCkge1xuXHRcdHJldHVybiBgaHR0cDovL2ltYWdlLnRtZGIub3JnL3QvcC93MTg1JHtwYXRofWA7XG5cdH1cblxuXHRjb25zb2xlLmxvZyhtb3ZpZXMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdtb3ZpZUdyaWQnKS5mYWN0b3J5KCdNb3ZpZXMnLCBmdW5jdGlvbiAoJGh0dHAsICRxKSB7XG5cdGNvbnN0IGZhY3RvcnkgPSB7fTtcblx0Y29uc3QgcGFnZUNhY2hlID0ge307XG5cblx0ZmFjdG9yeS5nZXRQYWdlID0gZnVuY3Rpb24gKHBhZ2UpIHtcblx0XHRpZiAocGFnZUNhY2hlW3BhZ2VdKSByZXR1cm4gJHEud2hlbihwYWdlQ2FjaGVbcGFnZV0pO1xuXG5cdFx0cmV0dXJuICRodHRwLmdldChgL2FwaS9tb3ZpZXMvJHtwYWdlfWApXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRwYWdlQ2FjaGVbcGFnZV0gPSByZXMuZGF0YTtcblx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZmFjdG9yeTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ21vdmllR3JpZCcpLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ21vdmllcycsIHtcblx0XHR1cmw6ICcvbW92aWVzLzpwYWdlJyxcblx0XHRjb250cm9sbGVyOiAnTW92aWVzQ3RybCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdtb3ZpZXMvbW92aWVzLmh0bWwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdG1vdmllczogZnVuY3Rpb24gKE1vdmllcywgJHN0YXRlUGFyYW1zKSB7XG5cdFx0XHRcdHJldHVybiBNb3ZpZXMuZ2V0UGFnZSgkc3RhdGVQYXJhbXMucGFnZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
