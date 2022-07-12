const express = require("express");
const router = express.Router();
const LeiturasController = require("../controllers/LeiturasController");
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/atuais", checkAuth, LeiturasController.atuais);
router.post("/atuais/criar", checkAuth, LeiturasController.atuaisCriar);
router.get(
  "/atuais/:livro/:date",
  checkAuth,
  LeiturasController.atuaisConcluir
);
router.get("/terminadas", checkAuth, LeiturasController.terminadas);

module.exports = router;
