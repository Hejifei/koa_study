const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());



// 创建一个sequelize对象实例：
// const Sequelize = require('sequelize');
// const config = require('./config');
// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

// 建表
// var user_info = sequelize.define('userinfo', {
//     id: {
//         type: Sequelize.STRING(50),
//         primaryKey: true
//     },
//     name: Sequelize.STRING(100),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//     timestamps: false
// });

// 增
// var now = Date.now();
// (async () => {
//     var dog = await user_info.create({
//         id: 'd-' + now,
//         name: 'Wangyan',
//         gender: false,
//         birth: '1993-06-17',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log('created: ' + JSON.stringify(dog));
// })();

// 查
// (async () => {
//     var peoples = await user_info.findAll({
//         where: {
//             name: 'Hejifei'
//         }
//     });
//     // console.log(`find ${peoples.length} peoples:`);
//     for (let p of peoples) {
//         console.log(JSON.stringify(p));
//         // 改
//         // p.gender = true;
//         // p.updatedAt = Date.now();
//         // p.version ++;
//         // p.birth= '1994-08-28',
//         // await p.save();

//         // 删
//         await p.destroy();
//     }
// })();

const model = require('./model');

let
    Pet = model.Pet,
    User = model.User;

(async () => {
    var user = await User.create({
        name: 'Hejifei',
        gender: false,
        email: 'john-' + Date.now() + '@garfield.pet',
        passwd: '123456'
    });
    console.log('created: ' + JSON.stringify(user));
    var cat = await Pet.create({
        ownerId: user.id,
        name: 'cat_hejifei',
        gender: false,
        birth: '2007-07-07',
    });
    console.log('created: ' + JSON.stringify(cat));
    var dog = await Pet.create({
        ownerId: user.id,
        name: 'dog_hejifei',
        gender: false,
        birth: '2008-08-08',
    });
    console.log('created: ' + JSON.stringify(dog));
})();

app.listen(1111);
console.log('app started at port 1111...');
