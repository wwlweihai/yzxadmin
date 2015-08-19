/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        cname
]);

function cname($stateProvider) {
    $stateProvider
    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'modules/chats/chats.html'
            }
        }
    })
    ;
}
