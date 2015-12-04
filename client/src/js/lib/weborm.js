var DATA_MAP = 'dataMap',
    BASE_URL = 'baseUrl',
    SOURCE_URL = 'sourceUrl',
    URL = 'url';

var firstWord = /([^\.]+)\.(.*)/;
require('./zepto');
var createService = function (config) {
        var service = {};
        var baseUrl = config[BASE_URL];
        var urlMap = getSourceUrlMap(config[SOURCE_URL]);
        for (var key in config[DATA_MAP]) {
            var getMethodName = 'get%s',
                requireUrl = {},
                item = config[DATA_MAP][key];
            requireUrl = getRequireUrl(item);
            getMethodName = getMethodName.replace('%s', key.charAt(0).toUpperCase().concat(key.slice(1)));
            service[getMethodName] = (function (params) {
                return function (callback) {
                    var response = {};
                    var requestNum = 0;
                    var _callback = function (who) {
                        return function (err, res) {
                            if (err) return;
                            var _res = JSON.parse(res[0]);
                            response[who] = _res;
                            if (--requestNum === 0) {
                                var final = {};
                                deepCopy(params.dataMap, final);
                                for (var item in final) {
                                    final[item] = eval('response.' + final[item])
                                }
                                typeof callback === 'function' && callback(final);
                            }
                        };
                    };
                    for (var i = 0; i < params.path.length; i++) {
                        requestNum++;
                        //console.log(params.methodName + ' getdata from----->' + urlMap[params.path[i]]);
                        getData(_callback(params.path[i]), {
                            url: baseUrl + urlMap[params.path[i]]
                        });
                    }
                    //console.log(params.methodName + ' need request ' + requestNum);
                }
            })({
                path: requireUrl,
                dataMap: item,
                methodName: getMethodName
            });
        }
        return service;
    },
    /**
     * 获取所需的url
     * @private
     */
    getRequireUrl = function (object) {
        var value = [],
            result = [],
            _result = {},
            _item,
            _value;
        // 遍历对象,获取所有值
        getAllObjValue(object, value);
        // 去重
        for (var i = 0, len = value.length; i < len; ++i) {
            var regRst = value[i].match(firstWord);
            _item = regRst[1];
            _value = regRst[2];
            _result[_item] = true;
        }
        // Object -> Array
        for (var key in _result) {
            result.push(key);
        }
        return result;
    },
    /**
     * restful接口获取字段
     * @private
     */
    getData = function (callback, option) {
        var _option = {
            // default settings
            success: function () {
                callback(null, Array.prototype.slice.apply(arguments));
            },
            error: function () {
                callback(Array.prototype.slice.apply(arguments));
            }
        };
        $.extend(_option, option);
        $.ajax(_option);
    };

/**
 * 递归遍历对象
 * @param object
 * @param result
 */
function getAllObjValue(object, result) {
    for (var key in object) {
        var value = object[key];
        if (typeof value === 'string') {
            result.push(value);
        } else if (typeof value === 'object') {
            arguments.callee.call(this, value, result);
        }
    }
}

/**
 * 复制
 * @param object
 * @param newObject
 */
function deepCopy(object, newObject){
    for (var key in object) {
        var value = object[key];
        if (typeof value !== 'object') {
            newObject[key] = value;
        } else if (typeof value === 'object') {
            newObject[key] = {};
            arguments.callee.call(this, value, newObject[key]);
        }
    }
}

function getSourceUrlMap(sourceUrl) {
    var result = {};
    for (var i in sourceUrl) {
        result[i] = sourceUrl[i][URL];
    }
    return result;
}

module.exports = {
    createService: createService
};