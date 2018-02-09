var router = require('koa-router')();
var user_controller = require('../../app/controllers/pet_controller');

router.get('/getPet', user_controller.getPet);
router.post('/registerPet', user_controller.registerPet);

module.exports = router;
