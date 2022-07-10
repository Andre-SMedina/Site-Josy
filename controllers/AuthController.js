const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const upper = require("../public/scripts/upper");

module.exports = class AuthController {
  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    let alert = "";
    const { name, senha, senha2, email } = req.body;
    const checkIfUserExists = await User.findOne({ email: email });

    if (senha != senha2) {
      alert = "As senhas não conferem, tente novamente";
      res.render("auth/register", { alert });
      return;
    }
    if (checkIfUserExists) {
      alert = "E-mail já cadastrado";
      res.render("auth/register", { alert });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(senha, salt);
    const nameUpper = upper(name);
    const user = {
      name: nameUpper,
      email,
      senha: hashedPassword,
    };

    try {
      await User.create(user);
      const createdUser = await User.findOne({ email: email });
      req.session.userid = createdUser.id;
      req.session.username = createdUser.name;
      req.session.save(() => {
        res.redirect("/");
      });
      return;
    } catch (error) {
      console.log("Ocorreu um erro em register" + error);
    }

    res.render("auth/register", { alert });
  }

  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    let alert = "";
    const { email, senha } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      alert = "Usuário ou senha não confere!";
      res.render("auth/login", { alert });
      return;
    }

    const passwordMatch = bcrypt.compareSync(senha, user.senha);

    if (!passwordMatch) {
      alert = "Usuário ou senha não confere!";
      res.render("auth/login", { alert });

      return;
    }

    req.session.userid = user.id;
    req.session.username = user.name;
    req.session.save(() => {
      res.redirect("/");
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
};
