/**
 * Created by jyh on 15/8/29.
 */
angular.module('app.service')
.factory('rockUtil',rockUtil);
rockUtil.$inject = [
    '$modal',
    'Restangular',
];
function rockUtil($modal,Restangular){

    var service = {
        openEditModal:openEditModal
    };
    return service;

    function openEditModal(editObj,type,templateUrl,sucCallback) {
        var targetEditObject = {};
        if (type == "edit" && editObj.length != 1) {
            alert("务必选择一行数据");
        } else {
            console.log(type);
            if (type == "edit") {
                targetEditObject = angular.copy(editObj[0]);
            }
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: templateUrl,
                resolve: {
                    operatOpts: function () {
                        var obj = {};
                        obj.editObj = targetEditObject;
                        if (type == "add") obj.oprTitle = "新增";
                        if (type == "edit") obj.oprTitle = "编辑";
                        return obj;
                    }
                },
                controller: function ($scope, $modalInstance, operatOpts) {
                    $scope.operatOpts = operatOpts;
                    $scope.ok = function () {
                        sucCallback(operatOpts.editObj);
                        $modalInstance.close();
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        }
    }
    //function openEditModal(editObj,type,templateUrl,sucCallback){
    //    var modalInstance = $modal.open({
    //        animation: true,
    //        templateUrl : templateUrl,
    //        resolve: {
    //            operatOpts: function () {
    //                var obj = {};
    //                obj.editObj = editObj;
    //                if(type == "add") obj.oprTitle = "新增";
    //                if(type == "edit") obj.oprTitle = "编辑";
    //                return obj;
    //            }
    //        },
    //        controller: function ($scope, $modalInstance,operatOpts) {
    //            $scope.operatOpts = operatOpts;
    //            $scope.ok = function () {
    //                sucCallback();
    //                $modalInstance.close();
    //            };
    //            $scope.cancel = function () {
    //                $modalInstance.dismiss('cancel');
    //            };
    //        }
    //    });
    //}
};
