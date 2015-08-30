/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        systemMgConfig
]);
function systemMgConfig($stateProvider) {
    $stateProvider
    .state('app.systemMg', {
        url: '/systemMg',
        params:{
            menus:null
        },
        views:{
            'appContentView':{
                templateUrl: 'modules/systemMg/systemMg.html',
                controller:'systemMg'
            }
        }
    })
    .state('app.systemMg.staffMg', {
        url: '/staffMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/systemMg/staffMg/staffMg.html',
                controller:'staffMg'
            }
        }
    })
    ;
}
