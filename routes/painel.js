const router = require("express").Router();
const CadModel = require("../database/models/cadastro.model");
async function cadastro(id) {
  const { name } = await CadModel.findOne({ _id: id });
  return name;
}

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const name = await cadastro(id);
  res.render("painel", { id, name });
});

router.get("/:id/resenhas", async (req, res) => {
  const id = req.params.id;
  const name = await cadastro(id);
  res.render("painel", { id, name });
});

module.exports = router;
