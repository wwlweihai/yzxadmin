/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        menuBlack
]);
function menuBlackConfig($stateProvider) {
    $stateProvider
    .state('app.menuBlank', {
        url: '/menuBlank',
        params:{
            menus:null
        },
        views:{
            'appContentView':{
                templateUrl: 'modules/menuBlank/menuBlank.html',
                controller:'menuBlank'
            }
        }
    })
    .state('app.menuBlank.subMenuBlank', {
        url: '/subMenuBlank',
        views:{
            'centerBoard':{
                templateUrl: 'modules/menuBlank/subMenuBlank/subMenuBlank.html',
                controller:'subMenuBlank'
            }
        }
    })
    ;
}
