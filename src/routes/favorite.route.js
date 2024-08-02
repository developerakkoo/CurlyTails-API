const router = require("express").Router();
const favoriteController = require("../controller/favorite.controller");

router.post("/add", favoriteController.addToFavorites);

router.post("/remove", favoriteController.removeFromFavorites);

router.get("/getAll", favoriteController.getFavoriteProducts);

module.exports = { favoriteRoutes: router };
