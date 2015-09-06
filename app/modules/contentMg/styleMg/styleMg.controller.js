angular.module('app.controller')
	.controller('styleMg', styleMg);
styleMg.$inject = [
    'Style',
    'gridOpts',
    'uiGridConstants',
    'dataService',
    'rockUtil',
    '$scope'
];
function styleMg(Style,gridOpts,uiGridConstants,dataService,rockUtil,$scope) {
    $scope.data = {};
    $scope.editStyleInfo = editStyleInfo;
    $scope.delStyleInfo = delStyleInfo;
    $scope.styleMgGridOptions = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {field: 'objectId', displayName: '风格id',maxWidth: 120,width: '30%'},
            {field: 'name', displayName: '风格名称',maxWidth: 150},
            {field: 'avatar', displayName: '风格首页图',maxWidth: 150},
            {field: 'images', displayName: '风格详细图',maxWidth: 150}
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
    angular.merge($scope.styleMgGridOptions, gridOpts.exportOpts,gridOpts.baseOpts);
	activate();
	////////////////
	function activate() {
        getAllStyle();
		console.log('load styleMg controller success');
	}
    function editStyleInfo(type){
        var selectedRows = $scope.gridApi.selection.getSelectedRows();
        rockUtil.openEditModal(selectedRows,type,'editStyleModal.html',sucCallback());
        function sucCallback(){
            return function(targetEditObject){
                if(type == "edit"){
                    updateStyle(selectedRows[0].objectId,Style.build(targetEditObject),function(data){
                        console.log(data);
                        angular.merge(selectedRows[0], targetEditObject);
                    });
                }else{
                    console.log(targetEditObject.images);
                    targetEditObject.images = stringToArray(targetEditObject.images)
                    var preAddStyle = Style.build(targetEditObject);
                    saveStyle(preAddStyle,addSuc());
                    function addSuc(){
                        return function(data){
                            preAddStyle.setId(data.objectId);
                            addDataToGrid(preAddStyle);
                        }
                    }
                }
            }
        }
    };
    function stringToArray(string){
        var origin = angular.copy(string);
        return origin.split(",");
    }
    function delStyleInfo(){
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
        $scope.styleMgGridOptions.data = array;
    };
    function addDataToGrid(obj){
        $scope.styleMgGridOptions.data.push(obj);
    };
    function delDataFromGrid(delObj){
        $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(delObj), 1);
        //angular.forEach(delObjs, function (data, index) {
        //    $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
        //});
    };
    //网络请求
    function getAllStyle(){
        dataService.getAll(Style.name,null,function(data){
            setGridData(data.results);
            console.log(data.results);
        });
    };
    function saveStyle(style,sucCallback){
        dataService.save(Style.name,style,sucCallback);
    };
    function updateStyle(objId,queryParams,sucCallback){
        dataService.update(Style.name,objId,queryParams,sucCallback);
    };
    function delStyle(objId,sucCallback){
        dataService.del(Style.name,objId,null,sucCallback);
    };
};
