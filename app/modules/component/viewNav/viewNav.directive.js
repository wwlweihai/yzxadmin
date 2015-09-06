angular.module('app.directive')
.directive('appSider', function() {
    var directive = {
        link: link,
        templateUrl: 'modules/component/appSider/appSider.html',
        scope: {
        },
        controller:'appSider'
    };
    return directive;
    function link(scope, element, attrs) {
    }
});




