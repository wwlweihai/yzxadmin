angular.module('app.controller')
	.controller('teamMg', teamMg);
teamMg.$inject = [
    'Team',
    'gridOpts',
    'uiGridConstants',
    'dataService',
    'rockUtil',
	'$scope'
];
function teamMg(Team,gridOpts,uiGridConstants,dataService,rockUtil,$scope) {
    //0,家装顾问;1,设计师;2,工程监理
    var modalObject = {};
    modalObject.teamTypes =  [{
        value:0,
        name:"家装顾问"
    },{
        value:1,
        name:"设计师"
    },{
        value:2,
        name:"工程监理"
    }];

    $scope.data = {};
    $scope.editTeam = editTeam;
    $scope.delTeam = delTeam;
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '团队id',maxWidth: 120,width: '30%'},
            {field: 'name', displayName: '团队名称',maxWidth: 150},
            {field: 'avatar', displayName: '团队头像',maxWidth: 150},
            {field: 'type', displayName: '团队类型',maxWidth: 150}
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
        getAllTeam();
        console.log('load styleMg controller success');
    }
    function editTeam(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        rockUtil.openEditModal(selectedRows,type,'editTeamModal.html',successCall(),modalObject);
        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    updateTeam(selectedRows[0].objectId,Team.build(targetEditObject),function(data){
                        angular.merge(selectedRows[0], targetEditObject);
                    });
                }else{
                    //console.log(targetEditObject);
                    var preAddTeam = Team.build(targetEditObject);
                    saveTeam(preAddTeam,addSuc());
                    function addSuc(){
                        return function(data){
                            preAddTeam.setId(data.objectId);
                            addDataToGrid(preAddTeam);
                        }
                    };
                }
            }
        }
    };
    function delTeam(){
        //var index = $scope.gridOptions.data.lastIndexOf($scope.gridApi.selection.getSelectedRows()[0]);
        var delObjes = $scope.gridApi.selection.getSelectedRows();
        angular.forEach(delObjes, function (data, index) {
            delStyle(data.objectId, function (data) {
                console.log(data);
            });
        });
    }
    //本地数据操作
    function setGridData(array){
        $scope.gridOptions.data = array;
    };
    function addDataToGrid(obj){
        $scope.gridOptions.data.push(obj);
    };
    function delDataFromGrid(delObj){
        $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(delObj), 1);
        //angular.forEach(delObjs, function (data, index) {
        //    $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
        //});
    };
    //网络请求
    function getAllTeam(){
        dataService.getAll(Team.name,null,function(data){
            setGridData(data.results);
        });
    };
    function saveTeam(team,sucCallback){
        dataService.save(Team.name,team,sucCallback);
    };
    function updateTeam(objId,queryParams,sucCallback){
        dataService.update(Team.name,objId,queryParams,sucCallback);
    };
    function delStyle(objId,sucCallback){
        dataService.del(Team.name,objId,null,sucCallback);
    };
};
