const router = require("express").Router();
const CadModel = require("../database/models/cadastro.model");

router.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

router.post("/cadastro/save", async (req, res) => {
  let alert = "";
  const { name, email, senha, senha2 } = req.body;
  const consult = await CadModel.findOne({ email: email });

  if (!name || !email || !senha || !senha2) {
    alert = "Preencha todos os campos!";
  } else if (senha != senha2) {
    alert = "As senhas não são iguais!";
  } else if (consult) {
    alert = "E-mail já cadastrado";
  } else if (senha.length < 7) {
    alert = "A senha deve conter no mínimo 8 dígitos!";
  } else {
    alert = "Cadastro Realizado!";
    await CadModel.create(req.body);
  }
  res.render("cadastro", { alert });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login/load", async (req, res) => {
  let alert = "";
  const { email, senha } = req.body;
  const consult = await CadModel.findOne({ email: email });

  if (!email || !senha) {
    alert = "Preencha todos os campos!";
  } else if (!consult) {
    alert = "E-mail não cadastrado!";
  } else if (consult.senha != senha) {
    alert = "Senha incorreta!";
  } else {
    return res.redirect(`/painel/${consult.id}`);
  }
  res.render("login", { alert });
});

module.exports = router;
