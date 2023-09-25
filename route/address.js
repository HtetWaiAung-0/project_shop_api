const router = require('express-promise-router')()
const controller = require('../controllers/address')
const {Schemas} = require('../utils/schemas')
const validator = require('../utils/validator')

router.post('/create',[validator.validateBody(Schemas.login)],controller.create)
router.get('/all',controller.all)
router.patch('/:id',[validator.validateBody(Schemas.login)],controller.update)

module.exports = router