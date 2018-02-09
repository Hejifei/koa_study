var connent = require('connect');

var server = connent();
var app = require('./sites/expressjs.dev');
server.use(connect.vhost('expressjs.dev',app));

server.listen(3000);





















