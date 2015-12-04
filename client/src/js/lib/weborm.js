var DATA_MAP = 'dataMap',
    SOURCE_URL = 'sourceUrl',
    URL = 'url';

var firstWord = /([^\.]+)\.(.*)/;
require('./zepto');
var createService = function (config) {
        var service = {};
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
                    var _callback = function () {
                        response[requestNum] = Array.prototype.slice.apply(arguments);
                        if (--requestNum === 0) {
                            console.log(response);
                            typeof callback === 'function' && callback(response);
                        }
                    };
                    var requestNum = 0;
                    for (var i = 0; i < params.path.length; i++) {
                        requestNum++;
                        //console.log(params.methodName + ' getdata from----->' + urlMap[params.path[i]]);
                        getData(_callback, {
                            url: urlMap[params.path[i]]
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