/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        '$urlRouterProvider',
        routeConfig
]);
function routeConfig($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('app/userMg/userList');
    $stateProvider
    .state('signin', {
        url: "/signin",
        templateUrl: "modules/signin/signin.html"
    })
    ;
}
