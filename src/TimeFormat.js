/**
 * @see http://php.net/manual/en/function.date.php
 */
TimeFormat = function(format){
    var second = 1,
        minute = 60*second,
        hour = minute*60,
        day = 24*hour,
        year = day*365,
        month = year/12;
    var secondBuffer = 0;

    getYearSeconds = function(years){
        return years*year;
    };

    getMonthSeconds = function(months){
        return months*month;
    };

    getDaySeconds = function(days){
        return days*day;
    };

    getHourSeconds = function(hours){
        return hours*hour;
    };

    getMinuteSeconds = function(minutes){
        return minutes*minute;
    };

    getSeconds = function(seconds){
        return seconds*second;
    };

    var setTimeBuffer = function(microsecondBuffer){
        secondBuffer = microsecondBuffer;
    };

    var getTimeBuffer = function(){
        return secondBuffer;
    };

    var calculateYears = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'Y';};
        me.hasLeadingZero = function(){return false;};
        var years = Math.floor((timeInSeconds/year));
        setTimeBuffer(timeInSeconds-getYearSeconds(years));
        return years;
    };

    var calculateMonths = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'm';};
        me.hasLeadingZero = function(){return false;};
        var months = Math.floor((timeInSeconds/month));
        setTimeBuffer(timeInSeconds-getMonthSeconds(months));
        return months;
    };

    var calculateDays = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'd';};
        me.hasLeadingZero = function(){return false;};
        var days = Math.floor((timeInSeconds/day));
        setTimeBuffer(timeInSeconds-getDaySeconds(days));
        return days;
    };

    var calculateHours = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'h';};
        me.hasLeadingZero = function(){return true;};
        var hours = Math.floor((timeInSeconds/hour));
        setTimeBuffer(timeInSeconds-getHourSeconds(hours));
        return hours;
    };

    //TODO move this to interfaces
    var calculateMinutes = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'i';};
        me.hasLeadingZero = function(){return true;};
        var minutes = Math.floor((timeInSeconds/minute));
        setTimeBuffer(timeInSeconds-getMinuteSeconds(minutes));
        return minutes;
    };

    var calculateSeconds = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 's';};
        me.hasLeadingZero = function(){return true;};
        var seconds = Math.floor((timeInSeconds/second));
        setTimeBuffer(timeInSeconds-getSeconds(seconds));
        return seconds;
    };

    var addLeadingZero = function(timeString){
        return ((timeString.length<=1)?'0':'')+timeString;
    };

    //TODO this dictionary and find strategy should be
    //a factory
    var strategyDictionary = {
        'Y' : calculateYears,
        'm' : calculateMonths,
        'd' : calculateDays,
        'h' : calculateHours,
        'i' : calculateMinutes,
        's' : calculateSeconds
    };

    var findStrategy = function(format){
        formatKeys = format.match(/%(\w)/g).join().match(/(\w+)/g);
        strategies = [];
        //TODO collection ?
        for (var i=0,len=formatKeys.length;i<len;i++) {
            if(strategyDictionary[formatKeys[i]]!=undefined)
                strategies.push(strategyDictionary[formatKeys[i]]);
        }
        return strategies;
    };

    return {
        format: function(timeInSeconds){
            setTimeBuffer(timeInSeconds);
            var strategies = findStrategy(format);
            var strategy;
            var result = format;
            var res = '';
            //TODO collection ?
            for(var i=0,len=strategies.length;i<len;i++){
                strategy=strategies[i];
                //TODO strategy represent an interface
                //->format
                //->hasLeadingZero
                //->addLeadingZero
                res = strategy.call(strategy, getTimeBuffer()).toString()
                if(strategy.hasLeadingZero())
                    res = addLeadingZero(res);
                result = result.replace('%'+strategies[i].getFormat(), res);
            }
            return result;
        }
    };
}
