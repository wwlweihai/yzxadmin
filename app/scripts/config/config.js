/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        '$urlRouterProvider',
        'RestangularProvider',
        config
]);
function config($stateProvider, $urlRouterProvider,RestangularProvider) {
    RestangularProvider.setBaseUrl('/localData');
};
