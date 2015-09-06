angular.module('app.controller')
.factory('UserInfo', function () {
    function UserInfo(userId,alias,roomstatus,roomarea) {
        // Public properties, assigned to the instance ('this')
        this.userId = userId;
        this.alias = alias;
        this.roomstatus = roomstatus;
        this.roomarea = roomarea;
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
    /**
     * Private property
     */
    var possibleRoles = ['admin', 'editor', 'guest'];

    /**
     * Private function
     */
    function checkRole(role) {
        return possibleRoles.indexOf(role) !== -1;
    }
    /**
     * Static property
     * Using copy to prevent modifications to private property
     */
    UserInfo.possibleRoles = angular.copy(possibleRoles);
    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    UserInfo.build = function (data) {
        return new UserInfo(
            data.userId,
            data.alias,
            data.roomstatus,
            data.roomarea
        );
    };

    /**
     * Return the constructor function
     */
    return UserInfo;
});
