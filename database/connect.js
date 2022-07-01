const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cadastro.mixqe8i.mongodb.net/?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log("Ocorreu um erro ao se conectar ao banco de dados.");
      }
      return console.log("Conexão com o banco de dados realizada com sucesso!");
    }
  );
};

module.exports = connectToDatabase;
