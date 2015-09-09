angular.module('app.controller')
.factory('AndroidVersion', function () {
    function AndroidVersion(objectId,version,updation,url,isLeaset) {
        this.objectId = objectId;
        this.version = version;
        this.updation = updation;
        this.url = url;
        this.isLeaset = isLeaset;
    };
    AndroidVersion.prototype.className = "AndroidVersion";
    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    AndroidVersion.build = function (data) {
        return new AndroidVersion(
            data.objectId,
            data.version,
            data.updation,
            data.url,
            data.isLeaset
        );
    };
    /**
     * Return the constructor function
     */
    return AndroidVersion;
});
