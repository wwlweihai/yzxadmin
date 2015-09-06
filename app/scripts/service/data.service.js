/**
 * Created by jyh on 15/8/29.
 */
angular.module('app.service')
.factory('dataService',dataService);
dataService.$inject = [
    'Restangular',
];
function dataService(Restangular){
    var header = {"Content-Type":"application/json"};
    var baseRouter = Restangular.one("classes");

    var service = {
        getAll:getAll,
        get:get,
        update:update,
        del:del,
        save:save
    };
    return service;

    function getAll(subRouter,queryParams,successCall,errorCall){
        var getRouter = baseRouter.one(subRouter);
        getRouter.get(queryParams).then(function(data){
            successCall(data);
        },function(error){
            errorCall(error);
        });
    };
    function get(subRouter,queryParams,successCall,errorCall){
        var getRouter = baseRouter.one(subRouter);
        getRouter.get(queryParams).then(function(data){
            successCall(data);
        },function(error){
            errorCall(error);
        });
    };
    function update(subRouter,objId,queryParams,successCall){
        console.log(queryParams);
        var singleRouter = baseRouter.one(subRouter,objId);
        singleRouter.customPUT(queryParams,null,null,header).then(function(data){
            successCall(data);
        },function(error){
            //errorCall(error);
        });
        //singleRouter.put(queryParams,header).then(function(data){
        //    successCall(data);
        //},function(error){
        //    errorCall(error);
        //});
    };

    function save(subRouter,subObejct,successCall){
        console.log("save object");
        baseRouter.post(subRouter,subObejct,null,header).then(function(data){
            successCall(data);
        },function(error){
            console.log(error);
        });
    };

    function del(subRouter,objId,queryParams,successCall){
        var singleRouter = baseRouter.one(subRouter,objId);
        singleRouter.remove(queryParams,header).then(function(data){
            successCall(data);
        },function(error){
            console.log(error);
        });
    };
};