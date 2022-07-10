const User = require("../models/User");
const upper = require("../public/scripts/upper");

module.exports = class HomeController {
  static async home(req, res) {
    try {
      const userId = req.session.userid;

      if (userId) {
        const { name } = await User.findById({ _id: userId });
        const nameUpper = upper(name);
        res.render("home", { nameUpper });

        return;
      }
    } catch (error) {
      console.log("Ocorreu um erro em home: " + error);
    }

    res.render("home");
  }
};
