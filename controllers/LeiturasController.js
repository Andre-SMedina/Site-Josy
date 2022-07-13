const User = require("../models/User");
const upper = require("../public/scripts/upper");

module.exports = class LeiturasController {
  static async atuais(req, res) {
    const userId = req.session.userid;
    const { leiturasAtuais } = await User.findOne({ _id: userId });

    res.render("leituras/atuais", { leiturasAtuais });
  }

  static async atuaisCriar(req, res) {
    const userId = req.session.userid;
    const { livro, date } = req.body;
    const { leiturasAtuais } = await User.findOne({ _id: userId });
    let livroFind = false;

    if (leiturasAtuais) {
      for (const i of leiturasAtuais) {
        if (i.livro === livro) {
          livroFind = true;
        }
      }
    }
    if (!livroFind) {
      const livroUpper = upper(livro);
      const dataBr = date.split("-").reverse().join("-");
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { leiturasAtuais: { livro: livroUpper, date: dataBr } } }
      );
      res.redirect("/leituras/atuais");
      return;
    }
    req.flash("message", "Livro já cadastrado");

    res.render("leituras/atuais", { leiturasAtuais });
  }

  static async atuaisExcluir(req, res) {
    const userId = req.session.userid;
    const livro = req.params.livro;
    await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { leiturasAtuais: { livro: livro } } }
    );

    res.redirect("/leituras/atuais");
  }

  static async atuaisConcluir(req, res) {
    const userId = req.session.userid;
    const { livro, date } = req.params;
    const data = new Date();
    const hoje = data.toLocaleDateString();
    const date2 = date.split("-").join("/");
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
          leiturasTerminadas: { livro: livro, dateIni: date2, dateFim: hoje },
        },
      }
    );
    await User.updateOne(
      { _id: userId },
      { $pull: { leiturasAtuais: { livro: livro } } }
    );
    res.redirect("/leituras/atuais");
  }

  static async terminadas(req, res) {
    const userId = req.session.userid;
    let { leiturasTerminadas } = await User.findOne({ _id: userId });
    let livros = [];
    let cont = 0;
    for (const l of leiturasTerminadas) {
      livros.push(l);
      livros[cont].tit = l.livro.split(" ").join("");
      cont++;
    }
    res.render("leituras/terminadas", { leiturasTerminadas });
  }
  static async notas(req, res) {
    const userId = req.session.userid;
    const livro = req.params.livro;
    const nota = req.params.nota;
    await User.updateOne(
      { _id: userId, "leiturasTerminadas.livro": livro },
      { $set: { "leiturasTerminadas.$.nota": nota } }
    );
    res.redirect("/leituras/terminadas");
  }
};
