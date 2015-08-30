/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        contentMgConfig
]);
function contentMgConfig($stateProvider) {
    $stateProvider
    .state('app.contentMg', {
        url: '/contentMg',
        params:{
            menus:null
        },
        views:{
            'appContentView':{
                templateUrl: 'modules/contentMg/contentMg.html',
                controller:'contentMg'
            }
        }
    })
    .state('app.contentMg.activityMg', {
        url: '/activityMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/contentMg/activityMg/activityMg.html',
                controller:'activityMg'
            }
        }
    })
    .state('app.contentMg.styleMg', {
        url: '/styleMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/contentMg/styleMg/styleMg.html',
                controller:'styleMg'
            }
        }
    })
    .state('app.contentMg.quoteMg', {
        url: '/quoteMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/contentMg/quoteMg/quoteMg.html',
                controller:'quoteMg'
            }
        }
    })
    .state('app.contentMg.projectMg', {
        url: '/projectMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/contentMg/projectMg/projectMg.html',
                controller:'projectMg'
            }
        }
    })
    .state('app.contentMg.subscribeMg', {
        url: '/subscribeMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/contentMg/subscribeMg/subscribeMg.html',
                controller:'subscribeMg'
            }
        }
    })
    ;
}
