const express = require("express");
const router = express.Router();
const LeiturasController = require("../controllers/LeiturasController");
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/atuais", checkAuth, LeiturasController.atuais);
router.post("/atuais", checkAuth, LeiturasController.atuaisCriar);
router.get(
  "/atuais/concluir/:livro/:date",
  checkAuth,
  LeiturasController.atuaisConcluir
);
router.get(
  "/atuais/excluir/:livro",
  checkAuth,
  LeiturasController.atuaisExcluir
);
router.get("/terminadas", checkAuth, LeiturasController.terminadas);
router.get("/nota/:livro/:nota", checkAuth, LeiturasController.notas);

module.exports = router;
