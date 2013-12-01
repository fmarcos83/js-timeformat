/**
 * @see http://php.net/manual/en/function.date.php
 */
TimeFormat = function(format){
    var validFormatChars=['Y','d','m','M','s'],
        second = 1;
        minute = 60*second;
        hour = minute*60;
        day = 24*hour;
        year = day*365;
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
        var years = Math.floor((timeInSeconds/year));
        setTimeBuffer(timeInSeconds-getYearSeconds(years));
        return years;
    };

    var calculateMonths = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'M';};
        var months = Math.floor((timeInSeconds/month));
        setTimeBuffer(timeInSeconds-getMonthSeconds(months));
        return months;
    };

    var calculateDays = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'd';};
        var days = Math.floor((timeInSeconds/day));
        setTimeBuffer(timeInSeconds-getDaySeconds(days));
        return days;
    };

    var calculateHours = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'h';};
        var hours = Math.floor((timeInSeconds/hour));
        setTimeBuffer(timeInSeconds-getHourSeconds(hours));
        return hours;
    };

    var calculateMinutes = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 'm';};
        var minutes = Math.floor((timeInSeconds/minute));
        setTimeBuffer(timeInSeconds-getMinuteSeconds(minutes));
        return minutes;
    };

    var calculateSeconds = function(timeInSeconds){
        var me = this;
        me.getFormat = function(){return 's';};
        var seconds = Math.floor((timeInSeconds/second));
        setTimeBuffer(timeInSeconds-getSeconds(seconds));
        return seconds;
    };

    var strategyDictionary = {
        'Y' : calculateYears,
        'M' : calculateMonths,
        'd' : calculateDays,
        'h' : calculateHours,
        'm' : calculateMinutes,
        's' : calculateSeconds
    };

    var findStrategy = function(format){
        formatKeys = format.match(/%(\w)/g).join().match(/(\w+)/g);
        strategies = [];
        for(var i=0;i<formatKeys.length;i++){
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
            for(var i=0,len=strategies.length;i<len;i++){
                strategy=strategies[i];
                res = strategy.call(strategy, getTimeBuffer()).toString()
                result = result.replace('%'+strategies[i].getFormat(), res);
            }
            return result;
        }
    };
}
