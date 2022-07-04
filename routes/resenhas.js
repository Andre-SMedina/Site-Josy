const router = require("express").Router();
const CadModel = require("../database/models/cadastro.model");
const upper = require("../database/models/upper");
const auth = true;

async function cadastro(id) {
  const { name } = await CadModel.findOne({ _id: id });
  const data = { name: name, id: id };
  return data;
}

async function find(id, livro) {
  const { resenhas } = await CadModel.findOne({ _id: id });
  const data = { alert: "" };
  if (!livro) {
    data.alert = "Insira o nome do livro";
  } else {
    for (i of resenhas) {
      if (i.livro === upper(livro)) {
        data.alert = "Já existe uma resenha deste livro!";
        break;
      }
    }
  }

  return data;
}

router.get("/:id", async (req, res) => {
  const { name, id } = await cadastro(req.params.id);
  res.render("resenhas", { id, name, auth });
});

router.get("/:id/resenhas/criar", async (req, res) => {
  const resCriar = true;
  const { name, id } = await cadastro(req.params.id);
  res.render("resenhas", { id, name, resCriar, auth });
});

router.post("/:id/resenhas/criar/save", async (req, res) => {
  const resCriar = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro, resenha } = await req.body;

  const data = find(id, livro);
  let alert = (await data).alert;

  if (!alert) {
    const livroUpper = upper(livro);
    await CadModel.findByIdAndUpdate(
      { _id: id },
      { $push: { resenhas: { livro: livroUpper, resenha: resenha } } }
    );
    alert = "Resenha criada com sucesso!";
  }
  res.render("resenhas", { id, name, resCriar, alert, auth });
});

router.get("/:id/resenhas/editar", async (req, res) => {
  const resEditar = true;
  const { name, id } = await cadastro(req.params.id);
  const { resenhas } = await CadModel.findById({ _id: id });

  res.render("resenhas", { id, name, resEditar, resenhas, auth });
});

router.post("/:id/resenhas/editar/save", async (req, res) => {
  const resEditar = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro, resenha } = req.body;

  await CadModel.updateOne(
    { _id: id, "resenhas.livro": livro },
    { $set: { "resenhas.$.resenha": resenha } }
  );

  const { resenhas } = await CadModel.findById({ _id: id });

  res.render("resenhas", { id, name, resEditar, resenhas, auth });
});

router.get("/:id/resenhas/ver", async (req, res) => {
  const resVer = true;
  const { name, id } = await cadastro(req.params.id);

  const { resenhas } = await CadModel.findById({ _id: id });
  res.render("resenhas", { id, name, resVer, resenhas, auth });
});

router.get("/:id/resenhas/delete", async (req, res) => {
  const resDelete = true;
  const { name, id } = await cadastro(req.params.id);
  const { resenhas } = await CadModel.findById({ _id: id });

  res.render("resenhas", { id, name, resDelete, resenhas, auth });
});

router.post("/:id/resenhas/delete/save", async (req, res) => {
  const resDelete = true;
  const { name, id } = await cadastro(req.params.id);
  const { livro } = req.body;

  await CadModel.updateOne(
    { _id: id },
    { $pull: { resenhas: { livro: livro } } }
  );

  const { resenhas } = await CadModel.findById({ _id: id });

  res.render("resenhas", { id, name, resDelete, resenhas, auth });
});

module.exports = router;
