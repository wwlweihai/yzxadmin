angular.module('app.controller')
	.controller('pointsMg', pointsMg);
pointsMg.$inject = [
	'$scope'
];
function pointsMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load pointsMg controller success');
	}
};
