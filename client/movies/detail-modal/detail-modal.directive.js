angular.module('movieGrid').directive('detailModal', function () {
	return {
		restrict: 'E',
		scope: {
			modalInfo: '=',
			closeModal: '&onClose',
			nextModal: '&onNext'
		},
		templateUrl: 'movies/detail-modal/detail-modal.html',
		link: function (scope, el, attrs) {

			scope.posterUrl = function (path) {
				if (!path) return 'images/poster_placeholder.jpg';

				return `http://image.tmdb.org/t/p/w185${path}`;
			};

			scope.getYear = function () {
				if (!scope.modalInfo.movie) return '';

				return scope.modalInfo.movie.release_date.split('-')[0];
			};
		}
	};
});
