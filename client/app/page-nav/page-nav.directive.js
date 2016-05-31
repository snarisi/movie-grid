angular.module('movieGrid').directive('pageNav', function () {
	return {
		restrict: 'E',
		scope: {
			page: '='
		},
		templateUrl: 'page-nav/page-nav.html',
		link: function (scope, el, attrs) {

			scope.listPages = function () {
				const curr = scope.page.current;
				if (curr === scope.page.total - 1) {
					return [curr - 1, curr, curr + 1];
				} else if (curr === scope.page.total) {
					return [curr - 2, curr - 1, curr];
				} else {
					return [curr, curr + 1, curr + 2];
				}
			};
		}
	};
});
