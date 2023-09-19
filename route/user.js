const router = require('express-promise-router')()
const controller = require('../controllers/user')
const {Schemas} = require('../utils/schemas')
const validator = require('../utils/validator')
router.post('/register',[validator.validateBody(Schemas.register)],controller.register)
router.post('/login',[validator.validateBody(Schemas.login)],controller.login)

module.exports = router