angular.module('app.controller')
.factory('Project', function () {
    function Project(objectId,userId,styleName,styleAvatar,roomInfo,startDate,endDate,jzTeam,sjTeam,jlTeam,periodId,periods) {
        this.objectId = objectId;
        this.userId = userId;
        this.styleName = styleName;
        this.styleAvatar = styleAvatar;
        this.roomInfo = roomInfo;
        this.startDate = startDate;
        this.endDate = endDate;
        this.jzTeam = jzTeam;
        this.sjTeam = sjTeam;
        this.jlTeam = jlTeam;
        this.periodId = periodId;
        this.periods = periods;
    };
    Project.prototype.toString = function(){
        return Project.name;
    };
    Project.prototype.setId = function(id){
        this.objectId = id;
    };
    Project.prototype.setPeriodId = function(periodId){
        this.periodId = periodId;
    };
    Project.prototype.setPeriod = function(periods){
        this.periods = periods;
    };
    /**
     * Static method, assigned to class
     * Instance ('this') is not available in static context
     */
    Project.build = function (data) {
        return new Project(
            data.objectId,
            data.userId,
            data.styleName,
            data.styleAvatar,
            data.roomInfo,
            data.startDate,
            data.endDate,
            data.jzTeam,
            data.sjTeam,
            data.jlTeam,
            data.periodId,
            data.periods
        );
    };
    /**
     * Return the constructor function
     */
    return Project;
});
