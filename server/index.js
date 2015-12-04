var express = require('express');
var http = require('http');
var pkg = require('./package.json');
var mock = require('./test/json/mock.json');

var start = Date.now(),
    port = process.env.PORT || 8088,
    app = express(),
    server;

//app.use();
for (var i in mock) {
    app.get('/' + i, (function (result) {
        return function (req, res) {
            res.set({
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(result));
        }
    })(mock[i]))
}
server = http.createServer(app);
server.listen(port);

console.log('%s booted in %dms - port: %s', pkg.name, ( Date.now() ) - start, port);