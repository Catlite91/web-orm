var webOrm = require('../lib/weborm');
var daoACfg = require('../dao/daoA');

var service = webOrm.createService(daoACfg);
module.exports = service;