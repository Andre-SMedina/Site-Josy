const express = require("express");
const router = express.Router();
const LivrosController = require("../controllers/LivrosController");
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/wishlist", checkAuth, LivrosController.list);
router.post("/wishlist", checkAuth, LivrosController.listPost);
router.get("/wishlist/:livro", checkAuth, LivrosController.excluir);
router.get("/adquiridos", checkAuth, LivrosController.adqlist);
router.post("/adquiridos", checkAuth, LivrosController.adqlistPost);
router.get("/adquiridos/:livro", checkAuth, LivrosController.adqexcluir);

module.exports = router;
