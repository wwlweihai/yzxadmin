angular.module('app.controller')
	.controller('userGroupCtrl', userGroupCtrl);
userGroupCtrl.$inject = [
	'$scope'
];

function userGroupCtrl($scope) {
	activate();
	////////////////
	function activate() {
		console.log('load userGroupCtrl controller success');
	}

    $scope.remove = function (scope) {
        scope.remove();
    };
    $scope.toggle = function (scope) {
        console.log('ds');
        //scope.toggle();
    };
    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };

    $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    };
    $scope.collapseAll = function () {
        $scope.$broadcast('collapseAll');
    };

    $scope.expandAll = function () {
        $scope.$broadcast('expandAll');
    };

    $scope.data = [{
        'id': 1,
        'title': '管理员',
        'nodes': [
            {
                'id': 11,
                'title': '超级管理员',
                'nodes': [{
                    'id': 111,
                    'title': '超级管理员111',
                    'nodes': [{
                        'id': 1111,
                        'title': '超级管理员1111',
                        'nodes': []
                    }]
                }]
            },
            {
                'id': 12,
                'title': '普通管理员',
                'nodes': []
            }
        ]
    }, {
        'id': 2,
        'title': '财务部',
        'nodes': [
            {
                'id': 21,
                'title': '出纳',
                'nodes': []
            },
            {
                'id': 22,
                'title': '会计',
                'nodes': []
            }
        ]
    }, {
        'id': 3,
        'title': '外勤',
        'nodes': [
        ]
    }];
};
