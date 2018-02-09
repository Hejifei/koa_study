const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app.js');

describe('pet_api', () => {
    
    it('getPet', (done) => {

        request(app.listen())
            .get('/api/pet/getPet?id=1')     //get方法
            .expect(200)                        //断言状态码为200
            .end((err, res) => {

                console.log(res.body);
                //断言data属性是一个对象
                expect(res.body.data).to.be.an('object');

                done();
            });
    })

    it('registerPet', (done) => {

        // 请求参数，模拟用户对象
        var user = {
            username: '小狗儿，小宝贝',
            age: 31
        }

        request(app.listen())
            .post('/api/pet/registerPet')            //post方法
            .send(user)                                 //添加请求参数
            .set('Content-Type', 'application/json')    //设置header的Content-Type为json
            .expect(200)                                //断言状态码为200
            .end((err, res) => {

                console.log(res.body);
                //断言返回的code是0
                expect(res.body.code).to.be.equal(0);
                done();
            })
    })
})