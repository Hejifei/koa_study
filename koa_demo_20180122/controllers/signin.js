// sign in:

module.exports = {
    'POST /signin': async (ctx, next) => {
        console.log('checking!!!')
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if(email === '' || password === ''){
            ctx.body = {
                code: 1001,
                msg: '请输入账号和密码！',
                data:''
            }
        }else{
            if (email === 'admin@example.com' && password === '123456') {
                ctx.body = {
                    code: 1,
                    msg: '登录成功！',
                    data:{}
                }
            }else {
                ctx.body = {
                    code: 0,
                    msg: '登录失败!',
                    data:{}
                }
            }
        }
        
    }
};
