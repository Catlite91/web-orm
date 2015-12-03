var DATA_MAP = 'dataMap';
var firstWord = /([^\.]+)\./;
var _createService = function (config) {
        var service = {};
        var requireUrlMap = {},
            item;
        for (var key in config[DATA_MAP]) {
            item = config[DATA_MAP][key];
            requireUrlMap[key] = _getRequireUrl(item);
        }
        return service;
    },
    /**
     * 获取所需的url
     * @private
     */
    _getRequireUrl = function (object) {
        var obj = object,
            value = [],
            result = [],
            _result = {},
            _item;
        // 遍历对象,获取所有值
        getAllObjValue(obj, value);
        // 去重
        for (var i = 0, len = value.length; i < len; ++i) {
            _item = value[i].match(firstWord)[1];
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
     * @param url
     * @param property [Map] 字段名称
     * @private
     */
    _getData = function (url, property) {

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

module.exports = {
    createService: _createService
};