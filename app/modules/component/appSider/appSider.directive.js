angular.module('app.directive')
.directive('appSider',appSider);
appSider.$inject = [];
function appSider() {
    var directive = {
        link: link,
        templateUrl: 'modules/component/appSider/appSider.html',
        scope: {
        },
        controller:'appSider'
    };
    return directive;
    function link(scope, element, attrs) {
        //scope.$broadcast('collapseAll');
    }
};




