/**
 * Created by ww on 2015/3/24.
 */
angular.module('app', [
    'app.core',
    'app.config',
    'app.value',
    'app.directive',
    'app.controller'
]);
angular.module('app.core', [
    /*3rd-party modules*/
    //restful request tool
    'restangular',
    'xeditable',
    'ui.bootstrap',
    'ui.tree',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.router'
    //'ui.bootstrap'
]);
angular.module('app.config', ['ui.router']);
angular.module('app.value', []);
angular.module('app.controller', []);
angular.module('app.directive', []);

