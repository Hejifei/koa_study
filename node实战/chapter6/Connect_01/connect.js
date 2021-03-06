var connect = require('connect');

// function logger(req,res,next){
//     console.log('%s %s',req.method,req.url);
//     next();
// }
function setup(format){
    var regexp = /:(\w+)/g;
    return function logger(req,res,next){
        var str = format.replace(regexp,function(match,property){
            return req[property];
        });
        console.log(str);
        next();
    }
}
module.exports = setup;
// 认证中间件
function restrict(req,res,next){
    var authorization = req.headers.authorization;
    if (!authorization) return next(new Error('Unauthorized'));
    
    var parts = authorization.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1],'base64').roString().split(':');
    var user = auth[0];
    var pass = auth[1];

    authenticateWithDatabase(user,pass,function(err){
        if (err) return next(err);
        next();
    })
}
// 显示管理面板的中间件
function admin(req,res,next){
    switch (req.url){
        case '/':
            res.end('try /users');
        case '/users':
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}

function hello(req,res){
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
}

var app = connect()
    .use(setup({some:'options'}))
    .use(hello)
    .listen(3000);










