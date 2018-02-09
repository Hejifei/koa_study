var router = require('koa-router')();
var user_router = require('./user_router');
var pet_router = require('./pet_router');

router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use('/pet', pet_router.routes(), pet_router.allowedMethods());

module.exports = router;
