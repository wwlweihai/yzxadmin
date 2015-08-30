angular.module('app.controller')
	.controller('styleCollectionMg', styleCollectionMg);
styleCollectionMg.$inject = [
	'$scope'
];
function styleCollectionMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load styleCollectionMg controller success');
	}
};
