/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        infoMgConfig
]);
function infoMgConfig($stateProvider) {
    $stateProvider
    .state('app.infoMg', {
        url: '/infoMg',
        params:{
            menus:null
        },
        views:{
            'appContentView':{
                templateUrl: 'modules/infoMg/infoIndex.html',
                controller:"infoMg"
            }
        }
    })
    .state('app.infoMg.caseCategory', {
        url: '/caseCategory',
        views:{
            'centerBoard':{
                templateUrl: 'modules/infoMg/caseCategory/caseCategory.html',
                controller:"caseCategory"
            }
        }
    })
    .state('app.infoMg.caseMg', {
        url: '/caseMg',
        views:{
            'centerBoard':{
                templateUrl: 'modules/infoMg/caseMg/caseMg.html',
                controller:"caseMg"
            }
        }
    })

    ;
}
