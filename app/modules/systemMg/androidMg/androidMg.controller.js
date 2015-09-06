angular.module('app.controller')
	.controller('androidMg', androidMg);
androidMg.$inject = [
	'$modal',
	'gridOpts',
	'uiGridConstants',
    'rockUtil',
    '$scope'
];

function androidMg($modal,gridOpts,uiGridConstants,rockUtil,$scope) {
    console.log("androidMg");
    $scope.deleteAndroid = deleteAndroid;
    $scope.editAndroid = editAndroid;
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'id', displayName: '版本编号',maxWidth: 120,width: '30%'},
            {field: 'version', displayName: '版本序号',maxWidth: 150},
            {field: 'updation', displayName: '版本改动',maxWidth: 250},
            {field: 'url', displayName: '版本下载地址',maxWidth: 250}
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
    angular.merge($scope.gridOptions, gridOpts.exportOpts,gridOpts.baseOpts);
    activate();
	////////////////
	function activate() {

	}
    function deleteAndroid(){
        //var index = $scope.gridOptions.data.lastIndexOf($scope.gridApi.selection.getSelectedRows()[0]);
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        angular.forEach(selectedRows, function (data, index) {
            $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
        });
    }
    function editAndroid(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        rockUtil.openEditModal(selectedRows,type,'editAndroidModal.html',sucCallback());
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
