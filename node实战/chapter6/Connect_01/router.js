// 使用router中间组件
var content = require('content');
var router = require('./middleware/router');
var routes = {
    GET:{
        '/users':function(req,res){
            res.end('tobi , loki ,ferret');
        },
        '/user/:id':function(req,res,id){
            res.end('user '+id);
        }
    },
    DELETE:{
        '/user/:id':function(req,res,id){
            res.end('delete user '+id);
        }
    }
};

var app = content()
    .use(router(routes))
    .listen(3000);



