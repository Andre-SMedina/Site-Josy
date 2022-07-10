const router = require("express").Router();
const CadModel = require("../models/cadastro");
const auth = true;

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = await CadModel.findOne({ _id: id });
  res.render("painel", { name, id, auth });
});

module.exports = router;
