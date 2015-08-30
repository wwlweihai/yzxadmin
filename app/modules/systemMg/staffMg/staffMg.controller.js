angular.module('app.controller')
	.controller('staffMg', staffMg);
staffMg.$inject = [
	'$modal',
	'gridOpts',
	'uiGridConstants',
	'$scope'
];

function staffMg($modal,gridOpts,uiGridConstants,$scope) {
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
        console.log("编辑");
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        var targetEditObject = {};
        if(type == "edit" && selectedRows.length != 1){
            alert("务必选择一行数据");
        }else{
            console.log("编辑");
            if(type == "edit"){
                targetEditObject = selectedRows[0];
            }
            handleStraffInfoModal(targetEditObject,type);
        }
    }
    function handleStraffInfoModal(editObj,type){
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'editStaffInfoModal.html',
            resolve: {
                operatOpts: function () {
                    var obj = {};
                    obj.editObj = editObj;
                    if(type == "add") obj.oprTitle = "新增";
                    if(type == "edit") obj.oprTitle = "编辑";
                    return obj;
                }
            },
            controller: function ($scope, $modalInstance,operatOpts) {
                $scope.operatOpts = operatOpts;
                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    }
};
