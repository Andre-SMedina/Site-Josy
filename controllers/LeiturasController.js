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
    const { leituras } = await User.findOne({ _id: userId });
    let livroFind = false;

    if (leituras) {
      for (const i of leituras) {
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
    res.render("leituras/atuais");
  }

  static async atuaisConcluir(req, res) {
    const userId = req.session.userid;
    const { livro, date } = req.params;
    const data = new Date();
    const hoje = data.toLocaleDateString();
    const date2 = date.replace("-", "/");
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
    const { leiturasTerminadas } = await User.findOne({ _id: userId });
    res.render("leituras/terminadas", { leiturasTerminadas });
  }
};
