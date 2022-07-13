const User = require("../models/User");
const upper = require("../public/scripts/upper");

module.exports = class ResenhasController {
  static async list(req, res) {
    try {
      const userId = req.session.userid;
      const { resenhas } = await User.findOne({ _id: userId });
      res.render("resenhas/list", { resenhas });

      return;
    } catch (error) {
      console.log("Ocorreu um erro em list! " + error);
    }
    res.redirect("/");
  }

  static create(req, res) {
    res.render("resenhas/create");
  }
  static async createPost(req, res) {
    const userId = req.session.userid;
    const { livro, resenha } = req.body;
    const { resenhas } = await User.findOne({ _id: userId });
    let livroFind = false;

    if (resenhas) {
      for (const i of resenhas) {
        if (i.livro === livro) {
          livroFind = true;
        }
      }
    }
    if (!livroFind) {
      const livroUpper = upper(livro);
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { resenhas: { livro: livroUpper, resenha: resenha } } }
      );
      res.redirect("/resenhas/create");
      return;
    }
    req.flash("message", "Livro já cadastrado");
    res.render("resenhas/create");
  }

  static async edit(req, res) {
    const userId = req.session.userid;
    const { resenhas } = await User.findById({ _id: userId });

    res.render("resenhas/edit", { resenhas });
  }

  static async editPost(req, res) {
    const userId = req.session.userid;
    const { livro, resenha } = req.body;
    await User.updateOne(
      { _id: userId, "resenhas.livro": livro },
      { $set: { "resenhas.$.resenha": resenha } }
    );

    res.redirect("/resenhas/edit");
  }

  static async delete(req, res) {
    const userId = req.session.userid;
    const { resenhas } = await User.findById({ _id: userId });

    res.render("resenhas/delete", { resenhas });
  }

  static async deletePost(req, res) {
    const userId = req.session.userid;
    const { livro } = req.body;

    await User.updateOne(
      { _id: userId },
      { $pull: { resenhas: { livro: livro } } }
    );

    res.redirect("/resenhas/delete");
  }
};
