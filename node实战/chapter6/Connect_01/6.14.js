// errorHandler中间件组件

// 不暴露非必要数据的错误处理数组
function errorHandler(err,req,res,next){
    console.log(err.stack);
    res.setHeader('Content-Type','application/json');
    if(err.notFound){
        res.statusCode = 404;
        res.end(JSON.stringify({error:err.message}));
    }else{
        res.statusCode = 500;
        res.end(JSON.stringify({error:'Internal Server Error'}));
    }
}














