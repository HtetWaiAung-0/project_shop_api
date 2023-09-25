const Router = require('express-promise-router')()
const controller = require('../controllers/category')
Router. post ('/create',controller.create)
Router.get('/all',controller.getAll)
Router.patch('/:id',controller.update)
Router.delete('/:id',controller.removeCatById)
module.exports = Router