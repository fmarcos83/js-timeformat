require('../src/TimeFormat.js');
var second = 1;
var minute = 60;
var hour = 3600;
var day = 24*3600;
var year = 365*day;
var month = Math.floor(year/12);
//TODO prepare overflow tests
describe('TimeFormat', function(){
    it('formats years independent', function(){
        var tf = new TimeFormat('%Y');
        expect(tf.format(year)).toEqual('1');
        expect(tf.format(year*2)).toEqual('2');
        expect(tf.format(year*2+1)).toEqual('2');
        expect(tf.format(year+month*12)).toEqual('2');
    });
    it('formats months independent', function(){
        var tf = new TimeFormat('%m');
        expect(tf.format(year)).toEqual('12');
        expect(tf.format(year+day*30)).toEqual('12');
        expect(tf.format(year-month)).toEqual('11');
        expect(tf.format(year+day*31)).toEqual('13');
        expect(tf.format(year+month)).toEqual('13');
        expect(tf.format(year+month*71)).toEqual('83');
        expect(tf.format(year+month*71)).toEqual('83');
    });
    it('formats days idendependent', function(){
        var tf = new TimeFormat('%d');
        expect(tf.format(year)).toEqual('365');
        expect(tf.format(year+day)).toEqual('366');
        expect(tf.format(year+day)).toEqual('366');
    });
    it('formats year and month', function(){
        var tf = new TimeFormat('%Y%m');
        expect(tf.format(year+month)).toEqual('11');
    });
    it('formats the dates according to input the format', function(){
        var tf = new TimeFormat('%Y %m %d');
        expect(tf.format(year+month)).toEqual('1 1 0');
        tf = new TimeFormat('%Y %m %d %i %s');
        expect(tf.format(year+month+(24*hour))).toEqual('1 1 1 00 00');
        tf = new TimeFormat('%Y %m %d %h %i %s');
        expect(tf.format(year+month+(23*hour))).toEqual('1 1 0 23 00 00');
        tf = new TimeFormat('%Y %m %d %h %i %s');
        expect(tf.format(year+month+(hour-minute))).toEqual('1 1 0 00 59 00');
        tf = new TimeFormat('%Y %m %d %h %i %s');
        expect(tf.format(year+month+(minute-second))).toEqual('1 1 0 00 00 59');
    });
    it('formats the dates with different strings in the input', function(){
        var tf = new TimeFormat('%Yyear %mmonths %ddays');
        expect(tf.format(year+month)).toEqual('1year 1months 0days');
    });
    it('check format with preceding 0\'s', function(){
        var tf = new TimeFormat('%h:%i:%s');
        expect(tf.format(hour+minute+second)).toEqual('01:01:01');
    });
});
