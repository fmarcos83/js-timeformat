# JS-TIMEFORMAT

Formats timestamps in milliseconds to human readable format
## Examples

```javascript
var seconds = 3600*24+7200+360+59;
var formatter = new TimeFormat('%Y %m %d %h:%i:%s');
formatter.format(seconds);
//expected result
'0 0 1 02:06:59';
```

## License

[MIT](http://opensource.org/licenses/mit-license.php)

## Versioning

This project follows [SEMV](http://semver.org) rules

## Installing
### Bower

```bash
bower install js-countdown
```
## Build
### Requirements

+ [jasmine-node](https://github.com/mhevery/jasmine-node)
+ [ant](http://ant.apache.org)

### Prepeare release

work in progress

### Tests

```bash
ant test
```
