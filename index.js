const express = require("express");
const exphbs = require("express-handlebars");
const usersRouter = require("./routes/users");
const resenhasRouter = require("./routes/resenhas");
const painelRouter = require("./routes/painel");
const dotenv = require("dotenv");
const connectToDatabase = require("./database/connect");
// const { model, models } = require("mongoose");
const app = express();
const hbs = exphbs.create({ partialsDir: ["views/partials"] });
const port = process.env.PORT || 8080;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectToDatabase();

app.use("/user", usersRouter);
app.use("/resenhas", resenhasRouter);
app.use("/painel", painelRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
const a = 4;
