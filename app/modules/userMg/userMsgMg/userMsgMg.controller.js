angular.module('app.controller')
	.controller('userMsgMg', userMsgMg);
userMsgMg.$inject = [
	'$scope'
];
function userMsgMg($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load userMsgMg controller success');
	}
};
