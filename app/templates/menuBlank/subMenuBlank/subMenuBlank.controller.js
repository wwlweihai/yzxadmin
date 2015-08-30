angular.module('app.controller')
	.controller('subMenuBlank', subMenuBlank);
subMenuBlank.$inject = [
	'$scope'
];
function subMenuBlank($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load subMenuBlank controller success');
	}
};
