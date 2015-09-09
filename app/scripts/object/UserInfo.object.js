angular.module('app.controller')
.factory('UserInfo', function () {
    function UserInfo(objectId,userId,alias,roomstatus,roomarea,jfen) {
        this.objectId = objectId;
        this.userId = userId;
        this.alias = alias;
        this.roomstatus = roomstatus;
        this.roomarea = roomarea;
        this.jfen = jfen;
    };
    UserInfo.prototype.toString = function(){
        return UserInfo.name;
    };
    UserInfo.prototype.setId = function(id){
        this.userId = id;
    };
    UserInfo.prototype.setRoomStatus = function(value){
        this.roomstatus = value;
    };
    UserInfo.prototype.setJfen = function(value){
        this.jfen = value;
    };
    UserInfo.build = function (data) {
        return new UserInfo(
            data.objectId,
            data.userId,
            data.alias,
            data.roomstatus,
            data.jfen,
            data.roomarea
        );
    };

    /**
     * Return the constructor function
     */
    return UserInfo;
});
