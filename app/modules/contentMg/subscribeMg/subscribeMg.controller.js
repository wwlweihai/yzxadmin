angular.module('app.controller')
	.controller('subscribeMg', subscribeMg);
subscribeMg.$inject = [
	'$scope'
];
function subscribeMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load subscribeMg controller success');
	}
};
