angular.module('app.controller')
.factory('Team', function () {
    function Team(objectId,name,avatar,type) {
        // Public properties, assigned to the instance ('this')
        this.objectId = objectId;
        this.name = name;
        this.avatar = avatar;
        this.type = type;
    };
    Team.prototype.toString = function(){
        return Team.name;
    };
    Team.prototype.setId = function(id){
        this.objectId = id;
    };
    Team.build = function (data) {
        return new Team(
            data.objectId,
            data.name,
            data.avatar,
            data.type
        );
    };
    return Team;
});
