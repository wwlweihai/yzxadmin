angular.module('app.controller')
	.controller('userList', userList);
userList.$inject = [
    '$modal',
    'gridOpts',
	'uiGridConstants',
	'$scope'
];
function userList($modal,gridOpts,uiGridConstants,$scope) {
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'id', displayName: '用户序号',maxWidth: 120,width: '30%'},
            {field: 'name', displayName: '昵称',maxWidth: 150},
            {field: 'username', displayName: '头像',maxWidth: 150},
            {field: 'username', displayName: '装修风格',maxWidth: 150},
            {field: 'username', displayName: '户型',maxWidth: 150},
            {field: 'username', displayName: '户型',maxWidth: 150},
            {field: 'password', displayName: '手机号码',maxWidth: 150}
        ],
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                var selectRowCount = gridApi.selection.getSelectedRows().length;
                $scope.data.oneRowSelected = false;
                $scope.data.multiRowSelected = false;
                if(selectRowCount === 1){
                    $scope.data.oneRowSelected = true;
                }
                if(selectRowCount > 1){
                    $scope.data.multiRowSelected = true;
                }
            });
            gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
                $scope.data.multiRowSelected = true;
            });
        }
    };
    $scope.gridOptions.data = [
        {
            id:1,
            name:"棒槌",
            username:"1234",
            password:"*****"
        },
        {
            id:2,
            name:"棒槌2",
            username:"1234",
            password:"*****"
        }
    ];
    angular.merge($scope.gridOptions, gridOpts.exportOpts,gridOpts.baseOpts);
	activate();
	////////////////
	function activate() {
		console.log('load userList controller success');
	}
};
