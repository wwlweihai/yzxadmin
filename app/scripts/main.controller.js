angular.module('app.controller')
.controller('mainCtrl',mainCtrl);
mainCtrl.$inject = [
    'appName',
    '$scope'
];
function mainCtrl(appName,$scope) {
    $scope.appName = appName;
};


