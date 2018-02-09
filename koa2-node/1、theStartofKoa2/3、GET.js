// koa中，获取GET请求数据源头有query(返回格式化好的参数对象)和querystring(返回的是请求字符串)方法
// 从上下文中直接获取 ctx.query  ctx.querystring
// 从上下文的request对象中获取 ctx.request.query ctx.request.querystring    


const Koa = require('koa');
const app = new Koa();

app.use(async(ctx)=>{
    let url = ctx.url;
    // 从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body={
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000,()=>{
    console.log('[demo] route-use-middleware is starting at port 3000');
})
























