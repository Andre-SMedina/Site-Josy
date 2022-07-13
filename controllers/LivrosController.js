const User = require("../models/User");
const upper = require("../public/scripts/upper");

module.exports = class LivrosController {
  static async list(req, res) {
    const userId = req.session.userid;
    const { listaDeDesejos } = await User.findOne({ _id: userId });
    res.render("livros/wishlist", { listaDeDesejos });
  }
  static async listPost(req, res) {
    const userId = req.session.userid;
    const { livro } = req.body;
    const { listaDeDesejos } = await User.findOne({ _id: userId });
    const livroUpper = upper(livro);
    let livroFind = false;

    if (listaDeDesejos) {
      for (const i of listaDeDesejos) {
        if (i.livro === livroUpper) {
          livroFind = true;
        }
      }
    }
    if (!livroFind) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { listaDeDesejos: { livro: livroUpper } } }
      );
      res.redirect("/livros/wishlist");
      return;
    }
    req.flash("message", "Livro já cadastrado");

    res.render("livros/wishlist", { listaDeDesejos });
  }

  static async excluir(req, res) {
    const userId = req.session.userid;
    const livro = req.params.livro;
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { listaDeDesejos: { livro: livro } } }
    );
    res.redirect("/livros/wishlist");
  }

  // ------------ADQUIRIDOS

  static async adqlist(req, res) {
    const userId = req.session.userid;
    const { adquiridos } = await User.findOne({ _id: userId });
    res.render("livros/adquiridos", { adquiridos });
  }
  static async adqlistPost(req, res) {
    const userId = req.session.userid;
    const { livro } = req.body;
    const { adquiridos } = await User.findOne({ _id: userId });
    const livroUpper = upper(livro);
    let livroFind = false;

    if (adquiridos) {
      for (const i of adquiridos) {
        if (i.livro === livroUpper) {
          livroFind = true;
        }
      }
    }
    if (!livroFind) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { adquiridos: { livro: livroUpper } } }
      );
      res.redirect("/livros/adquiridos");
      return;
    }
    req.flash("message", "Livro já cadastrado");

    res.render("livros/adquiridos", { adquiridos });
  }

  static async adqexcluir(req, res) {
    const userId = req.session.userid;
    const livro = req.params.livro;
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { adquiridos: { livro: livro } } }
    );
    res.redirect("/livros/adquiridos");
  }
};
