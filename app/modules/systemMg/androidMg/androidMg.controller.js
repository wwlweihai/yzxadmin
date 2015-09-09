angular.module('app.controller')
	.controller('androidMg', androidMg);
androidMg.$inject = [
	'AndroidVersion',
	'dataService',
	'gridOpts',
	'uiGridConstants',
    'rockUtil',
    '$scope'
];

function androidMg(AndroidVersion,dataService,gridOpts,uiGridConstants,rockUtil,$scope) {
    var modalObject = {};
    $scope.editAndroid = editAndroid;
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '版本编号',maxWidth: 120,width: '30%'},
            {field: 'version', displayName: '版本序号',maxWidth: 150},
            {field: 'updation', displayName: '版本改动',maxWidth: 250},
            {field: 'url', displayName: '版本下载地址',maxWidth: 250},
            {field: 'isLeaset', displayName: '是否最新版本',maxWidth: 150}
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
        refreshGridData();
        console.log('load styleMg controller success');
    }
    function editAndroid(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        dataService.getUsers(null,function(data){
            modalObject.users = data.results;
            rockUtil.openEditModal(selectedRows,type,'editAndroidModal.html',successCall(),modalObject);
        },null);
        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    var androidVersion = AndroidVersion.build(targetEditObject);
                    updateAndroidVersion(androidVersion,androidVersion,function(data){
                        refreshGridData();
                    });
                }else{
                    console.log(targetEditObject);
                    var preAddAndroidVersion = AndroidVersion.build(targetEditObject);
                    saveAndroidVersion(preAddAndroidVersion,addSuc());
                    function addSuc(){
                        return function(data){
                            refreshGridData();
                        }
                    };
                }
            }
        }
    };
    //本地数据操作
    function refreshGridData(){
        dataService.getAll("AndroidVersion",null,function(data){
            $scope.gridOptions.data = data.results;
        });
    }
    //网络请求
    function saveAndroidVersion(androidVersion,sucCallback){
        dataService.save(androidVersion.className,androidVersion,sucCallback);
    };
    function updateAndroidVersion(androidVersion,queryParams,sucCallback){
        dataService.update(androidVersion.className,androidVersion.objectId,queryParams,sucCallback);
    };
};
