angular.module('app.controller')
	.controller('quoteMg', quoteMg);
quoteMg.$inject = [
	'$scope'
];
function quoteMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load quoteMg controller success');
	}
};
