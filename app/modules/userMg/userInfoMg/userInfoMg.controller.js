angular.module('app.controller')
	.controller('userInfoMg', userInfoMg);
userInfoMg.$inject = [
    'UserInfo',
    'dataService',
    'gridOpts',
    'uiGridConstants',
    'rockUtil',
    '$scope'
];
function userInfoMg(UserInfo,dataService,gridOpts,uiGridConstants,rockUtil,$scope) {
    var modalObject = {};
    $scope.editUserInfo = editUserInfo;
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '积分编号',maxWidth: 120,width: '30%'},
            {field: 'userId', displayName: '操作用户',maxWidth: 150},
            {field: 'num', displayName: '积分数量',maxWidth: 250},
            {field: 'reason', displayName: '加/减原因',maxWidth: 250},
            {field: 'date', displayName: '操作时间',maxWidth: 150}
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
    function editUserInfo(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        dataService.getUsers(null,function(data){
            modalObject.users = data.results;
            rockUtil.openEditModal(selectedRows,type,'editUserInfoModal.html',successCall(),modalObject);
        },null);
        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    var UserInfo = UserInfo.build(targetEditObject);
                    updateUserInfo(UserInfo,UserInfo,function(data){
                        refreshGridData();
                    });
                }else{
                    console.log(targetEditObject);
                    var preAddUserInfo = UserInfo.build(targetEditObject);
                    saveUserInfo(preAddUserInfo,addSuc());
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
        dataService.getAll("UserInfo",null,function(data){
            $scope.gridOptions.data = data.results;
        });
    }
    //网络请求
    function saveUserInfo(UserInfo,sucCallback){
        dataService.save(UserInfo.className,UserInfo,sucCallback);
    };
    function updateUserInfo(UserInfo,queryParams,sucCallback){
        //dataService.update(UserInfo.className,UserInfo.objectId,queryParams,sucCallback);
    };
};
