/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        appConfig
]);
function appConfig($stateProvider) {
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'modules/component/app/app.html',
        controller:"app"
    })
    .state('app.blank', {
        url: '/blank',
        views:{
            'appContentView':{
                templateUrl: 'modules/component/blank/blank.html'
            }
        }
    })
    ;
}
