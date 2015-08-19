/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        userMgConfig
]);
function userMgConfig($stateProvider) {
    $stateProvider
    .state('app.userMg', {
        url: '/userMg',
        params:{
            menus:null
        },
        views:{
            'appContentView':{
                templateUrl: 'modules/userMg/userIndex.html',
                controller:'userMg'
            }
        }
    })
    .state('app.userMg.userGroup', {
        url: '/userGroup',
        views:{
            'centerBoard':{
                templateUrl: 'modules/userMg/userGroup/userGroup.html',
                controller:'userGroupCtrl'
            }
        }
    })
    ;
}
