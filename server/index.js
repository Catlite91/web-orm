var express = require('express');
var http = require('http');
var pkg = require('./package.json');

var start = Date.now(),
    port = process.env.PORT || 8080,
    app = express(),
    server;

//app.use();
server = http.createServer(app);
server.listen(port);

console.log('%s booted in %dms - port: %s', pkg.name, ( Date.now() ) - start, port);