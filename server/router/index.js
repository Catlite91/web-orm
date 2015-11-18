var controller = require('../controller/index');
module.exports = function (app) {
    //首页
    app.get('/', controller.index);
    app.get('/url/a', controller.url.a);
    app.get('/url/b', controller.url.b);
    app.get('/url/c', controller.url.c);
};