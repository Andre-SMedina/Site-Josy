const router = require("express").Router();
const CadModel = require("../database/models/cadastro.model");

async function cadastro(id) {
  const { name } = await CadModel.findOne({ _id: id });
  const data = { name: name, id: id };
  return data;
}

async function find(id, livro, criar, editar) {
  const { resenhas } = await CadModel.findOne({ _id: id });
  const data = { alert: "" };
  if (!livro) {
    data.alert = "Insira o nome do livro";
  } else {
    for (i of resenhas) {
      if (i.livro === livro && criar) {
        data.alert = "Já existe uma resenha desse livro!";
        break;
      } else if (i.livro === livro && editar) {
        data.alert = "encontrado";
        break;
      }
    }
    if (!data.alert && editar) data.alert = "Livro não encontrado";
  }

  return data;
}

router.get("/:id", async (req, res) => {
  const { name, id } = await cadastro(req.params.id);
  res.render("painel", { id, name });
});

router.get("/:id/resenhas/criar", async (req, res) => {
  const resCriar = true;
  const { name, id } = await cadastro(req.params.id);
  res.render("painel", { id, name, resCriar });
});

router.post("/:id/resenhas/criar/save", async (req, res) => {
  const resCriar = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro, resenha } = await req.body;

  const data = find(id, livro, true, false);
  let alert = (await data).alert;

  if (!alert) {
    await CadModel.findByIdAndUpdate(
      { _id: id },
      { $push: { resenhas: { livro: livro, resenha: resenha } } }
    );
    alert = "Resenha criada com sucesso!";
  }
  res.render("painel", { id, name, resCriar, alert });
});

router.get("/:id/resenhas/editar", async (req, res) => {
  const resEditar = true;
  const { name, id } = await cadastro(req.params.id);
  const {resenhas} = await CadModel.findById({_id: id})

  res.render("painel", { id, name, resEditar, resenhas });
});

router.post("/:id/resenhas/editar/save", async (req, res) => {
  const resEditar = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro, resenha } = req.body;
  const {resenhas} = await CadModel.findById({_id: id})
  console.log(req.body);
/*   const data = await find(id, livro, false, true);
  let alert = data.alert;

  if (alert === "encontrado") {
    await CadModel.updateOne(
      { _id: id, "resenhas.livro": livro },
      { $set: { "resenhas.$.resenha": resenha } }
    );
    alert = "Resenha editada com sucesso!";
  } */
  res.render("painel", { id, name, resEditar, resenhas });
});

router.get("/:id/resenhas/ver", async (req, res) => {
  const resVer = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro } = req.body;

  const { resenhas } = await CadModel.findById({ _id: id });
  res.render("painel", { id, name, resVer, resenhas });
});

module.exports = router;
