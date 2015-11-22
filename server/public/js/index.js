//var webOrm = require('web-orm');
//var daoACfg = require('../dao/daoA');
var daoACfg = {
    source: {
        A: {
            url: 'url/a'
        },
        B: {
            url: 'url/b'
        },
        C: {
            url: 'url/c'
        }
    },
    dataMap: {
        a: {
            require: {
                a: 'A.a',
                b: 'A.b',
                x: 'A.x',
                ze: {
                    e: 'B.e',
                    z: 'C.z'
                }
            }
        },
        b: {
            require: {
                d: 'B.d',
                e: 'B.e',
                y: 'B.y'
            }
        },
        c: {
            require: {
                x: 'C.x',
                y: 'C.y',
                z: 'C.z'
            }
        },
        d: {
            require: {
                a: 'A.a',
                b: 'A.b',
                e: 'B.e',
                x: 'C.x',
                z: 'C.z'
            }
        }
    }
};
var webOrm = function(cfg) {
    var source = cfg.source,
        dataMap = cfg.dataMap,
        require = dataMap.require,
        methodName, // 方法名称
        requireUrl = [], // 需要请求的url
        reveiveData, // 返回数据字段
        resultData, // 转换后字段
        returnObj = {};
    for (var i in dataMap) {
        var _arr = i.split(''),
            _first = _arr[0].toLocaleUpperCase(),
            _name;
        _arr[0] = _first;
        _name = _arr.join('');
        methodName = 'get' + _name;
        for(var d in require){

        }
        // methodUrl = 
        returnObj[methodName] = function(options) {
            var callback = options.callback || function() {};
            // $.ajax({
            //     url:
            // });
            callback('success');
        }
    }
    return returnObj;
};

var _getObjectValue = function(object){

};

var daoA = webOrm(daoACfg);

//module.exports = {
var service = {
    getA: function() {
        daoA.getA({
            callback: function(res) {
                console.log(res);
            }
        });
    },
    getB: function() {
        daoA.getB({
            callback: function(res) {
                console.log(res);
            }
        });
    },
    getC: function() {
        daoA.getC({
            callback: function(res) {
                console.log(res);
            }
        });
    },
    getD: function() {
        daoA.getD({
            callback: function(res) {
                console.log(res);
            }
        });
    }
};