const express = require("express");
const exphbs = require("express-handlebars");
const usersRouter = require("./routes/users");
const dotenv = require("dotenv");
const connectToDatabase = require("./database/connect");
const app = express();
const hbs = exphbs.create({ partialsDir: ["views/partials"] });
const port = 3000;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectToDatabase();

app.use("/", usersRouter);


app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Rodando na porta 3000`);
});
