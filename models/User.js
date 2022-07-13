const mongoose = require("mongoose");

const cadSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  senha: { type: String },
  resenhas: [],
  leiturasAtuais: [],
  leiturasTerminadas: [],
  listaDeDesejos: [],
  adquiridos: [],
});

const User = mongoose.model("Resenhas", cadSchema);

module.exports = User;
