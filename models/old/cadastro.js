const mongoose = require("mongoose");

const cadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  senha: { type: String, minlength: 7 },
  resenhas: [],
});

const CadModel = mongoose.model("Registration", cadSchema);

module.exports = CadModel;
