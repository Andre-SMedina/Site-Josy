const User = require("../models/User");

module.exports.checkAuth = async (req, res, next) => {
  const userId = req.session.userid;
  if (!userId) {
    res.render("home");

    return;
  } else if (userId) {
    const user = await User.findById({ _id: userId });

    if (!user) {
      req.session.destroy();
      res.render("home");

      return;
    }
  }

  next();
};
