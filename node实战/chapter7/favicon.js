// 网站的小图标

// // favicon()一般放在中间件栈的最顶端，所以连日志都会忽略对favicon的请求。

var connect = require('connect');
connect()
    .use(connect.favicon(__dirname + '/public/favicon.icon'))
    .use(connect.logger())
    .use(function(req,res){
        res.end('Hello World!\n');
    })















