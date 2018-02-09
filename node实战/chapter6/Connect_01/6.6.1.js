// Connect的默认错误处理器
var connect = require('connect');
connect()
    .use(function hello(req,res){
        foo();
        res.setHeader('Content-Type','text/plain');
        res.end('hello world');
    })
    .listen(3000);







