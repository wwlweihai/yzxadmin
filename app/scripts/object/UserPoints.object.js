angular.module('app.controller')
.factory('UserPoints', function () {
    function UserPoints(objectId,userId,num,reason,date) {
        this.objectId = objectId;
        this.userId = userId;
        this.num = num;
        this.reason = reason;
        this.date = date;
    };
    UserPoints.prototype.className = "UserPoints";

    UserPoints.build = function (data) {
        return new UserPoints(
            data.objectId,
            data.userId,
            data.num,
            data.reason,
            data.date
        );
    };

    /**
     * Return the constructor function
     */
    return UserPoints;
});
