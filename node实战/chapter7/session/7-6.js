var connect = require('connect');

// 想让会话在24小时后过期，只有在试用HTTPS时才会发送会话cookie
var hour = 3600000;
var sessionOpts = {
    key:'myapp_sid',
    cookie:{maxAge : hour*24 , secure: true}
}

var app = connect()
    .use(connect.favicon())
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session(sessionOpts))
    .use(function(req,res,next){
        var sess = req.session;
        if(sess.views){
            res.setHeader('Content-Type','text/html');
            res.write('<p>views: '+sess.views+'</p>')
            res.end();
            sess.views++;
        }else{
            sess.views = 1;
            res.end('welcome to the session demo. refresh!')
        }
    })

app.listen(3000);




























