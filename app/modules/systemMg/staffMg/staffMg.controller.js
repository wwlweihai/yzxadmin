angular.module('app.controller')
	.controller('staffMg', staffMg);
staffMg.$inject = [
	'$modal',
	'gridOpts',
	'uiGridConstants',
    'rockUtil',
    '$scope'
];

function staffMg($modal,gridOpts,uiGridConstants,rockUtil,$scope) {
    $scope.deleteStaff = deleteStaff;
    $scope.editStaffInfo = editStaffInfo;
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'id', displayName: '员工编号',maxWidth: 120,width: '30%'},
            {field: 'name', displayName: '员工姓名',maxWidth: 150},
            {field: 'username', displayName: '登录账号',maxWidth: 150},
            {field: 'password', displayName: '登录密码',maxWidth: 150}
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

	}
    function deleteStaff(){
        //var index = $scope.gridOptions.data.lastIndexOf($scope.gridApi.selection.getSelectedRows()[0]);
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        angular.forEach(selectedRows, function (data, index) {
            $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
        });
    }
    function editStaffInfo(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        rockUtil.openEditModal(selectedRows,type,'editStaffInfoModal.html',sucCallback());
        function sucCallback(){
            return function(targetEditObject){
                if(type == "edit"){
                    angular.merge(selectedRows[0], targetEditObject);
                }else{
                    $scope.gridOptions.data.push(targetEditObject);
                }
            }
        }
    }
};
