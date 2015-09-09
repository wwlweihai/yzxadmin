angular.module('app.controller')
	.controller('projectMg', projectMg);
projectMg.$inject = [
    'Project',
    'Team',
    'gridOpts',
    'uiGridConstants',
    'dataService',
    'rockUtil',
    '$scope'
];
function projectMg(Project,Team,gridOpts,uiGridConstants,dataService,rockUtil,$scope) {
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
    $scope.editPeriod = editPeriod;
    $scope.editProject = editProject;
    $scope.delProject = delProject;
    $scope.gridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '项目id',maxWidth: 120,width: '30%'},
            {field: 'userId', displayName: '用户Id',maxWidth: 150},
            {field: 'styleName', displayName: '项目风格',maxWidth: 150},
            {field: 'styleAvatar', displayName: '风格首页图',maxWidth: 150},
            {field: 'roomInfo', displayName: '房间信息',maxWidth: 150},
            {field: 'periodId', displayName: '项目阶段',maxWidth: 150},
            {field: 'startDate', displayName: '开始时间',maxWidth: 150},
            {field: 'endDate', displayName: '结束时间',maxWidth: 150}
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
        getAllProject();
        console.log('load styleMg controller success');
    }
    function editProject(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        var modalObject = {};
        dataService.getUsers(null,function(data){
            modalObject.users = data.results;
            getAll(Team.name,function(data){
                modalObject.jzTeams = data.results;
                getAll(Team.name,function(data){
                    modalObject.sjTeams = data.results;
                    getAll(Team.name,function(data){
                        modalObject.jlTeams = data.results;
                        rockUtil.openEditModal(selectedRows,type,'editProjectModal.html',successCall(),modalObject);
                    },{where:{type:2}});
                },{where:{type:1}});
            },{where:{type:0}});

        },null);

        function successCall(){
            return function(targetEditObject){
                if(type == "edit"){
                    updateProject(selectedRows[0].objectId,Project.build(targetEditObject),function(data){
                        angular.merge(selectedRows[0], targetEditObject);
                    });
                }else{
                    //console.log(targetEditObject);
                    targetEditObject.periodId = 0;
                    targetEditObject.periods = new Array();
                    var preAddProject = Project.build(targetEditObject);
                    saveProject(preAddProject,addSuc());
                    function addSuc(){
                        return function(data){
                            console.log(data);
                            preAddProject.setId(data.objectId);
                            addDataToGrid(preAddProject);
                        }
                    };
                }
            }
        }
    };
    function delProject(){
        //var index = $scope.gridOptions.data.lastIndexOf($scope.gridApi.selection.getSelectedRows()[0]);
        var delObjes = $scope.gridApi.selection.getSelectedRows();
        angular.forEach(delObjes, function (data, index) {
            delStyle(data.objectId, function (data) {
                console.log(data);
            });
        });
    }
    function editPeriod(){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        var modalObject = {};
        modalObject.periodList = [{id:0, name:"测量设计"},{id:1, name:"水电阶段"},{id:2, name:"泥水阶段"},
            {id:3, name:"油漆阶段"},{id:4, name:"竣工阶段"},{id:5, name:"软装配饰"}];
        rockUtil.openEditModal(selectedRows,"add",'editPeriodModal.html',successCall(),modalObject);
        function successCall(){
            return function(targetEditObject){
                var project = Project.build(selectedRows[0]);

                //{periodId: 1, date: Wed Sep 09 2015 00:00:00 GMT+0800 (CST), images: "21123123"}
                var period = {};
                period.id = targetEditObject.period.id;
                period.name = targetEditObject.period.name;
                period.date = targetEditObject.date;
                period.images = stringToArray(targetEditObject.images);
                project.setPeriodId(period.id);
                project.getPeriods().push(period);

                updateProject(project.objectId,project,function(data){
                    alert("修改项目阶段成功");
                });
            }
        }
    };
    function stringToArray(string){
        var origin = angular.copy(string);
        return origin.split(",");
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
    function getAll(className,successCall,queryParams){
        dataService.getAll(className,queryParams,successCall);
    };
    function getAllProject(){
        dataService.getAll(Project.name,null,function(data){
            setGridData(data.results);
        });
    };
    function saveProject(team,sucCallback){
        dataService.save(Project.name,team,sucCallback);
    };
    function updateProject(objId,queryParams,sucCallback){
        dataService.update(Project.name,objId,queryParams,sucCallback);
    };
    function delStyle(objId,sucCallback){
        dataService.del(Project.name,objId,null,sucCallback);
    };
};
