const router = require("express").Router();
const promoCodeController = require("../controller/promoCode.controller");

/***** Promo code routes *****/
router.post("/add", promoCodeController.addPromoCode);

router.put("/update/:promoCodeId", promoCodeController.updatedPromoCode);

router.get("/get/:promoCodeId", promoCodeController.getPromoCode);

router.get("/getAll", promoCodeController.getAllPromoCodes);

router.delete("/delete/:promoCodeId", promoCodeController.deletePromoCode);

module.exports = { promoCodeRoutes: router };
