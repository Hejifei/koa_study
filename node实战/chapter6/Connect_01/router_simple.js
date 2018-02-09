var parse = require('url').parse;

module.exports = function route(obj){
    return function(req,res,next){
        // 检查以确保req.method定义了
        if (!obj[req.method]){
            // 如果未定义，调用next()，并停止一切后续操作
            next();
            return;0
        }
        // 查找req.method对应的路径
        var routes = obj[req.method];
        // 解析URL，以便跟pathname匹配
        var url = parse(req.url);
        // 将req.method对应的路径存放到数组中
        // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
        var paths = Object.keys(routes);

        for(var i = 0;i<paths.length;i++){
            var path = paths[i];
            var fn = routes[path];
            path = path
                .replace(/\//g,'\\/')
                .replace(/:(\w+)/g,'([^\\/]+)');
            // 构造正则表达式
            var re = new RegExp('^' + path + '$');
            var captures = url.pathname.match(re);
            // 尝试跟pathname匹配
            if(captures){
                // 传递被捕获的分组
                var args = [req,res].concat(captures.slice(1));
                fn.apply(null,args);
                return;
            }
        }
        next();
    }
}























