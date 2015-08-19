angular.module('app.directive')
.directive('cname',cname);
cname.$inject = [];
function cname() {
    var directive = {
        link: link,
        templateUrl: '',
        scope: {

        },
        restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
        console.log('指令载入成功');
    }
};




