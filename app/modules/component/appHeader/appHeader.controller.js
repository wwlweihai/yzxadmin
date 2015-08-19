angular.module('app.controller')
	.controller('appHeader', appHeader);
appHeader.$inject = [
	'$state',
	'appName',
	'$scope'
];

function appHeader($state,appName,$scope) {
    $scope.appName = appName;
    $scope.direct = direct;
    $scope.data = {};

    function direct(menu,index){
        $scope.data.selectMenu = index;
        $state.go(menu.url,{"menus": menu.subMenus});
    };
};
