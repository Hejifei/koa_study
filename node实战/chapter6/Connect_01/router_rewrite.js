var connect = require('connect');
var url = require('url');

var path = url.parse(req.url).pathname;

function rewrite(req,res,next){
    var match = path.match(/^\/blog\/posts\/(.+)/);
    // 只针对/blog/posts请求执行查找
    if(match){
        findPostIdBySlug(match[1],function(err,id){
            // 如果查找出错，则通知错误处理器并停止处理
            if (err) return next(err);
            // 如果没找到跟缩略名相对应的ID，则带着"User not found"的错误参数调用next()
            if (!id) return next(new Error('User not found'));
            // 重写req.url属性，以便后续中间件可以使用真实的ID
            req.url = '/blog/posts/'+id;
            next();
        });
    }else{
        next();
    }
}

var app = connect()
    .use(rewrite)
    .use(showPost)
    .listen(3000);

















