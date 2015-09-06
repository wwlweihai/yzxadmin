angular.module('app.controller')
.factory('Style', function () {
    function Style(objectId,name,avatar,images) {
        // Public properties, assigned to the instance ('this')
        this.objectId = objectId;
        this.name = name;
        this.avatar = avatar;
        this.images = images;
    };
    Style.prototype.toString = function(){
        return Style.name;
    };
    Style.prototype.setId = function(id){
        this.objectId = id;
    };
    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Style.build = function (data) {
        return new Style(
            data.objectId,
            data.name,
            data.avatar,
            data.images
        );
    };
    /**
     * Return the constructor function
     */
    return Style;
});
