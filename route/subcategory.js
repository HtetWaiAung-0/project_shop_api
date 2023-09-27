const router = require("express-promise-router")();
const catDb = require("../models/category");
const subcatDb = require('../models/subcategory')
const { Schemas } = require("../utils/schemas");
const controller = require("../controllers/subcategory");
const {
  isExitId,
  uploadNewPhoto,
  validateParam,
  validateBody,
  updatePhoto,
} = require("../utils/validator");

router.get('/all',controller.getAll)
router.post(
  "/create/:id",
  [
    validateParam(Schemas.Gschema.id, "id"),
    isExitId(catDb),
    validateBody(Schemas.subCat),
    uploadNewPhoto(),
  ],
  controller.create
);

router.patch(
  "/:id",
  [validateParam(Schemas.Gschema.id, "id"), isExitId(subcatDb), updatePhoto()],
  controller.update
);

router.delete('/:id',[
    validateParam(Schemas.Gschema.id,'id'),
    isExitId(subcatDb)
],
    controller.remove
)
//write updatec subcat rouet below this comment

//write delete route here

module.exports = router;
