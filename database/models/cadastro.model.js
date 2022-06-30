const mongoose = require("mongoose");

const cadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true, minlength: 7 },
});

const CadModel = mongoose.model("Registration", cadSchema);

module.exports = CadModel;
