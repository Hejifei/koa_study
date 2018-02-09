// cookieParser()  解析来自浏览器的cookie，放到req.cookies中
// bodyParser() 读取并解析请求体，放到req.body中
// limit() 跟bodyParser()联手防止读取过大的请求
// query() 解析请求URL的查询字符串，放到req.query中

var http = require('http');

// cookeParser():解析HTTP cookie
var connect = require('connect');
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function(req,res){
        res.setHeader('Set-Cookie','foo=bar');
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(3000);

// bodyParser()：解析请求主体
var app2 = connect()
    .use(connect.bodyParser())
    .use(function(req,res){
        console.log(req.body);
        console.log(req.files);
        res.end('Thanks!');
    })

// limit 设计limit()中间件组件的目的是帮助过滤巨型的请求，不管它们是不是恶意的。
// 防止用户恶意或无意间传入大文件或超大的JSON字符串把bodyParser()锁住，并最终锁住V8的JSON.parser()方法。所以要配置好服务器，以应对这些情况
var app3 = connect()
    .use(connect.limit('32kb'))
    .use(connect.bodyParser())
    .use(hello);
http.createServer(app3).listen(3000);

    // limit()灵活性
    // 根据请求的Content-Type限制主体大小
    function type(type,fn){
        return function(req,res,next){
            // 被返回的中间件首先检查content-type
            var ct = req.headers['content-type'] || '';
            if (0 != ct.indexOf(type)){
                return next();
            }
            // 然后它会调用传入的limit组件
            fn(req,res,next);
        }
    }
    var app4 = connect()
        .use(type('application/x-www-form-urlencoded',connect.limit('64kb')))
        .use(type('application/json',connect.limit('32kb')))
        .use(type('image',connect.limit('2mb')))
        .use(type('video',connect.limit('300mb')))
        .use(connect.bodyParser())
        .use(hello);

// query()：查询字符串解析
var app4 = connect()
    .use(connect.query())
    .use(function(req,res,next){
        res.setHeader('Content_Type','application/json');
        res.end(JSON.stringify(req.query));
    })



















