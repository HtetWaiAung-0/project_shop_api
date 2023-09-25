const router = require('express-promise-router')()
const controller = require('../controllers/subcategory')
 router.post('/create/:id',controller.create)
 router.patch('/:id',controller.update)
 //write updatec subcat rouet below this comment

 //write delete route here

 module.exports = router