const router = require('express-promise-router')()
const controller = require('../controllers/subcategory')
 router.post('/create/:id',controller.create)

 module.exports = router