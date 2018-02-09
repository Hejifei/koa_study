// 将日志输出到/var/log/myapp.log
var fs = require('fs');
var connect = require('connect');
var log = fs.createWriteStream('/var/log/myapp.log',{flags:'a'})
var app = connect()
    .use(connect.logger({format:':method :url',stream: log}))
    .use('/error',error)
    .use(function(){
        console.log('hello world!');
    })
    .listen(3000);















