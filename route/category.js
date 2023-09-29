const Router = require('express-promise-router')();
const controller = require('../controllers/category');

const catDb = require('../models/category');

const {Schemas} = require('../utils/schemas');
const {validateParam,validateBody,uploadNewPhoto,updatePhoto,isExitId, isExitName} 
= require('../utils/validator');

Router.get('/search',controller.paginate)
Router. post ('/create',
[
    validateBody(Schemas.allTypeOfCAt),
    isExitName(catDb),
    uploadNewPhoto('category'),
],
controller.create)

Router.patch('/:id',
[
    validateParam(Schemas.Gschema.id,'id'),
    isExitId(catDb),
    updatePhoto('category')
],
controller.update)
Router.delete('/:id',
[
    validateParam(Schemas.Gschema.id,'id'),
    isExitId(catDb)
],
controller.removeCatById)
module.exports = Router