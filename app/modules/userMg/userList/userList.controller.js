angular.module('app.controller')
	.controller('userList', userList);
userList.$inject = [
    '$modal',
    'gridOpts',
	'uiGridConstants',
	'dataService',
	'usersService',
	'$scope'
];
function userList($modal,gridOpts,uiGridConstants,dataService,usersService,$scope) {
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '用户id',maxWidth: 120,width: '30%'},
            {field: 'username', displayName: '用户账号',maxWidth: 150},
            {field: 'mobilePhoneNumber', displayName: '手机号码',maxWidth: 150}
        ],
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                console.log(row.entity);
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
    angular.merge($scope.gridOptions, gridOpts.exportOpts,gridOpts.baseOpts);
	activate();
	////////////////
	function activate() {
        usersService.get(null,getUsersSuc(),getUsersErr());

        function getUsersSuc(){
            return function(data){
                $scope.gridOptions.data = data.results;
            }
        };
        function getUsersErr(){
            return function(error){
            }
        };
	}
};
