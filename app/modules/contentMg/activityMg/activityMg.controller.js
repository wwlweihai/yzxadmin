angular.module('app.controller')
	.controller('activityMg', activityMg);
activityMg.$inject = [
	'$scope'
];
function activityMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load activityMg controller success');
	}
};
