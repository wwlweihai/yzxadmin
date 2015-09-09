angular.module('app.controller')
.factory('UserMsg', function () {
    function UserMsg(objectId,userId,title,content,status) {
        this.objectId = objectId;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.status = status;
    };
    UserMsg.prototype.className = "UserMsg";
    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    UserMsg.build = function (data) {
        return new UserMsg(
            data.objectId,
            data.userId,
            data.title,
            data.content,
            data.status
        );
    };
    /**
     * Return the constructor function
     */
    return UserMsg;
});
