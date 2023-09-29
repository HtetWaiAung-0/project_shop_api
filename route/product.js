const router = require('express-promise-router')();
const controller = require('../controllers/product');
const childcatDb = require('../models/childcategory');
const productDb = require('../models/product');

const { Schemas } = require("../utils/schemas");
const controller = require("../controllers/subcategory");
const {isExitId,uploadNewPhoto,validateParam,validateBody,updatePhoto, isExitName,} = require("../utils/validator");
const { valid } = require('joi');

router.get('/search',controller.paginate)
router.post('/create/:id',
[
    validateParam(Schemas.Gschema.id,'id'),
    validateBody()
])

module.exports = router;