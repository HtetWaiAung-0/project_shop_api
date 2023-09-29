const router = require('express-promise-router')();

const subcatDb = require('../models/subcategory');
const childcatDb = require('../models/childcategory');

const controller = require('../controllers/childcategory');

const {Schemas} = require('../utils/schemas')
const {validateParam,validateBody,uploadNewPhoto,updatePhoto,isExitId, isExitName} 
= require('../utils/validator')


router.get('/search',controller.paginate);
router.post('/create',
[
    validateParam(Schemas.Gschema.id, "id"),
isExitId(subcatDb),
validateBody(Schemas.allTypeOfCAt),
isExitName(childcatDb),
uploadNewPhoto('childcategory'),],
controller.create);

router.patch('/:id',
[validateParam(Schemas.Gschema.id, "id"), isExitId(childcatDb), updatePhoto('childcategory')],controller.update);
router.delete('/id',
[validateParam(Schemas.Gschema.id,'id'),isExitId(childcatDb)],
controller.remove)