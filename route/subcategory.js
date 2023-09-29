const router = require("express-promise-router")();
const catDb = require("../models/category");
const subcatDb = require('../models/subcategory')
const { Schemas } = require("../utils/schemas");
const controller = require("../controllers/subcategory");
const {isExitId,uploadNewPhoto,validateParam,validateBody,updatePhoto, isExitName,} = require("../utils/validator");

router.get('/search',controller.paginate)
router.post(
  "/create/:id",
  [
    validateParam(Schemas.Gschema.id, "id"),
    isExitId(catDb),
    validateBody(Schemas.allTypeOfCAt),
    isExitName(subcatDb),
    uploadNewPhoto('subcategory'),
  ],
  controller.create
);

router.patch(
  "/:id",
  [
    validateParam(Schemas.Gschema.id, "id"),
    isExitId(subcatDb), 
    updatePhoto('subcategory')
  ],
  controller.update
);

router.delete('/:id',[
    validateParam(Schemas.Gschema.id,'id'),
    isExitId(subcatDb)
],
    controller.remove
)


module.exports = router;
