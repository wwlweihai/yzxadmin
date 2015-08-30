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
    .state('app.userMg.userList', {
        url: '/userList',
        views:{
            'centerBoard':{
                templateUrl: 'modules/userMg/userList/userList.html',
                controller:'userList'
            }
        }
    })
    .state('app.userMg.pointsMg', {
        url: '/pointsMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/userMg/pointsMg/pointsMg.html',
                controller:'pointsMg'
            }
        }
    })
    .state('app.userMg.styleCollectionMg', {
        url: '/styleCollectionMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/userMg/styleCollectionMg/styleCollectionMg.html',
                controller:'styleCollectionMg'
            }
        }
    })
    .state('app.userMg.userMsgMg', {
        url: '/userMsgMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/userMg/userMsgMg/userMsgMg.html',
                controller:'userMsgMg'
            }
        }
    })
    ;
}
