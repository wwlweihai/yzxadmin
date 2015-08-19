angular.module('app.controller')
	.controller('caseMg', caseMg);
caseMg.$inject = [
	'$scope'
];

function caseMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load caseMg controller success');
	}
};
