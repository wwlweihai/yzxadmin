angular.module('app.controller')
.controller('appSider', appSider);
appSider.$inject = [
	'$stateParams',
	'$state',
	'$scope'
];
function appSider($stateParams,$state,$scope) {
    $scope.data = {};
    $scope.data.menus = $stateParams.menus;
    $scope.data.toggle = toggle;
    $scope.data.direct = direct;
    $scope.data.collapseTree = collapseTree;
    $scope.data.selectMenu;

    activate();
	////////////////
	function activate() {
        //collapseAll();
        $scope.$broadcast('collapseAll');
	}
    function collapseTree() {
        $scope.$broadcast('collapseAll');
    };
    function toggle(scope) {
        console.log("toggle");
        if(scope.collapsed){
            scope.collapseAll();
        }
        scope.toggle();
    };
    function direct(menu){
        $scope.data.selectMenu = menu;
        $state.go(menu.url);
    }
};
