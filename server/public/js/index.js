//var webOrm = require('web-orm');
//var daoACfg = require('../dao/daoA');
var daoACfg = {
    url: {A: 'url/a', B: 'url/b', C: 'url/c'},
    a: {a: 'A.a', b: 'A.b', x: 'A.x'},
    b: {d: 'B.d', e: 'B.e', y: 'B.y'},
    c: {x: 'C.x', y: 'C.y', z: 'C.z'},
    d: {a: 'A.a', b: 'A.b', e: 'B.e', x: 'C.x', z: 'C.z'}
};
var webOrm = function (cfg) {
    return {};
};

var daoA = webOrm(daoACfg);

//module.exports = {
var service = {
    getA: function () {
        return daoA.getA();
    },
    getB: function () {
        return daoA.getB();
    },
    getC: function () {
        return daoA.getC();
    },
    getD: function () {
        return daoA.getD();
    }
};