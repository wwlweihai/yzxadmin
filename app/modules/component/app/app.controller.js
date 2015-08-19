angular.module('app.controller')
	.controller('app', app);
app.$inject = [
	'menus',
	'$scope'
];
function app(menus,$scope) {
    $scope.menus = menus;
	activate();
	////////////////
	function activate() {
		console.log('load app controller success');
	}
};
