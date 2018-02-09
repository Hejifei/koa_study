// // MySQL配置文件
// var config = {
//     database: 'test', // 使用哪个数据库
//     username: 'root', // 用户名
//     password: '123456', // 口令
//     host: 'localhost', // 主机名
//     port: 3306 // 端口号，MySQL默认3306
// };

// module.exports = config;

const defaultConfig = './config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;