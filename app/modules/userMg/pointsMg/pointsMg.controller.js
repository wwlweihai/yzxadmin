angular.module('app.controller')
	.controller('pointsMg', pointsMg);
pointsMg.$inject = [
    'UserInfo',
    'UserPoints',
    'dataService',
    'gridOpts',
    'uiGridConstants',
    'rockUtil',
    '$scope'
];
function pointsMg(UserInfo,UserPoints,dataService,gridOpts,uiGridConstants,rockUtil,$scope) {
    var modalObject = {};
    $scope.editUserPoints = editUserPoints;
    $scope.data = {};
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '积分编号',maxWidth: 120,width: '30%'},
            {field: 'userId', displayName: '操作用户',maxWidth: 220},
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
    function editUserPoints(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        dataService.getUsers(null,function(data){
            modalObject.users = data.results;
            rockUtil.openEditModal(selectedRows,type,'editUserPointsModal.html',successCall(),modalObject);
        },null);
        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    var userPoints = UserPoints.build(targetEditObject);
                    updateUserPoints(userPoints,userPoints,function(data){
                        refreshGridData();
                    });
                }else{
                    var userPoints = UserPoints.build(targetEditObject);
                    saveUserPoints(userPoints,function(data){
                        refreshGridData();
                    });
                    getUserInfo(targetEditObject.userId,function(data){
                        var curUserInfo = UserInfo.build(data.results[0]);
                        curUserInfo.jfen = Number(curUserInfo.jfen) + Number(targetEditObject.num);
                        updateUserInfo(curUserInfo,curUserInfo,function(data){
                            console.log(data);
                        });
                    });
                }
            }
        }
    };
    //本地数据操作
    function refreshGridData(){
        dataService.getAll("UserPoints",null,function(data){
            $scope.gridOptions.data = data.results;
        });
    }
    //网络请求
    function saveUserPoints(userPoints,sucCallback){
        dataService.save(userPoints.className,userPoints,sucCallback);
    };
    function updateUserPoints(userPoints,queryParams,sucCallback){
        dataService.update(userPoints.className,userPoints.objectId,queryParams,sucCallback);
    };
    function getUserInfo(userId,successCall){
        dataService.get("UserInfo",{where:{"userId":userId}},successCall);
    };
    function updateUserInfo(userInfo,queryParams,sucCallback){
        console.log(userInfo);
        dataService.update("UserInfo",userInfo.objectId,queryParams,sucCallback);
    };
};
