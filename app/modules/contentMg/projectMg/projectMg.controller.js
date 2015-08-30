angular.module('app.controller')
	.controller('projectMg', projectMg);
projectMg.$inject = [
	'$scope'
];
function projectMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load projectMg controller success');
	}
};
