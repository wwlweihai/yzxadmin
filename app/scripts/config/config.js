/**
 * Created by ww on 2015/4/11.
 */
angular.module('app.config')
.config([
        '$stateProvider',
        '$urlRouterProvider',
        'RestangularProvider',
        config
]);
function config($stateProvider, $urlRouterProvider,RestangularProvider) {
    RestangularProvider.setBaseUrl('https://leancloud.cn/1.1');
    RestangularProvider.setDefaultHeaders({
        "X-AVOSCloud-Application-Id":"zXmsYkXYionV4s9pHc3IKghD",
        "X-AVOSCloud-Application-Key":"gHmRen4R5I3ziAE7wcP7vKw1"
    });
};
