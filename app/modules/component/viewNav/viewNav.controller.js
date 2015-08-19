angular.module('app.controller')
.controller('viewNav', viewNav);
viewNav.$inject = [
	'$stateParams',
	'$scope'
];
function viewNav($stateParams,$scope) {
    $scope.data = {};
    $scope.data.menus = $stateParams.menus;
    $scope.data.toggle = toggle;
    activate();
	////////////////
	function activate() {
	}
};
