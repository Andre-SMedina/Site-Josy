const mongoose = require("mongoose");

const cadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  senha: { type: String, minlength: 7 },
  resenhas: [],
});

const User = mongoose.model("Resenhas", cadSchema);

module.exports = User;
