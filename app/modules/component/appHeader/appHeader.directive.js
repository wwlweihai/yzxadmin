angular.module('app.directive')
.directive('appHeader', function() {
    var directive = {
        link: link,
        templateUrl: 'modules/component/appHeader/appHeader.html',
        scope: {
            menus:'='
        },
        restrict: 'E',
        controller:'appHeader'
    };
    return directive;
    function link(scope, element, attrs) {
    };
});




