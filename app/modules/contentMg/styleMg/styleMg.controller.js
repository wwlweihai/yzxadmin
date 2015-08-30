angular.module('app.controller')
	.controller('styleMg', styleMg);
styleMg.$inject = [
	'$scope'
];
function styleMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load styleMg controller success');
	}
};
