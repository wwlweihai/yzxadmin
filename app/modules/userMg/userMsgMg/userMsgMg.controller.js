angular.module('app.controller')
	.controller('userMsgMg', userMsgMg);
userMsgMg.$inject = [
    'UserMsg',
    'gridOpts',
    'uiGridConstants',
    'dataService',
    'rockUtil',
    '$scope'
];
function userMsgMg(UserMsg,gridOpts,uiGridConstants,dataService,rockUtil,$scope) {
    var modalObject = {};
    modalObject.msgStatus =  [{
        value:0,
        name:"未读"
    },{
        value:1,
        name:"已读"
    },{
        value:2,
        name:"用户删除"
    }];

    $scope.data = {};
    $scope.editUserMsg = editUserMsg;
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '消息id',maxWidth: 120,width: '30%'},
            {field: 'userId', displayName: '用户id',maxWidth: 200},
            {field: 'title', displayName: '消息标题',maxWidth: 150},
            {field: 'content', displayName: '消息内容',maxWidth: 150},
            {field: 'status', displayName: '消息状态',maxWidth: 150}
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
    function editUserMsg(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        dataService.getUsers(null,function(data){
            modalObject.users = data.results;
            rockUtil.openEditModal(selectedRows,type,'editUserMsgModal.html',successCall(),modalObject);
        },null);
        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    var userMsg = UserMsg.build(targetEditObject);
                    updateUserMsg(userMsg,userMsg,function(data){
                        refreshGridData();
                    });
                }else{
                    console.log(targetEditObject);
                    var preAddUserMsg = UserMsg.build(targetEditObject);
                    saveUserMsg(preAddUserMsg,addSuc());
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
        dataService.getAll("UserMsg",null,function(data){
            console.log(data.results);
            $scope.gridOptions.data = data.results;
        });
    }
    //网络请求
    function saveUserMsg(userMsg,sucCallback){
        dataService.save(userMsg.className,userMsg,sucCallback);
    };
    function updateUserMsg(userMsg,queryParams,sucCallback){
        dataService.update(userMsg.className,userMsg.objectId,queryParams,sucCallback);
    };
};
