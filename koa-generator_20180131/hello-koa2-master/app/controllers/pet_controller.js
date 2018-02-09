const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
//获取用户
exports.getPet = async (ctx, next) => {

    //如果id != 1抛出API 异常
    if(ctx.query.id != 1){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    ctx.body = {
        username: '小狗儿，小宝贝',
        age: 0.5
    }
}

//用户注册
exports.registerPet = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}