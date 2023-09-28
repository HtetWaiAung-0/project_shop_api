const Router = require('express-promise-router')()
const controller = require('../controllers/category')
Router. post ('/create',controller.create)
Router.get('/search',controller.paginate)
Router.patch('/:id',controller.update)
Router.delete('/:id',controller.removeCatById)
module.exports = Router