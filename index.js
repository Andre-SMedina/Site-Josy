const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const dotenv = require("dotenv");
const flash = require("express-flash");
const app = express();
const conn = require("./db/conn");
const hbs = exphbs.create({ partialsDir: ["views/partials"] });
const port = process.env.PORT || 8080;

//Import Routes
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const resenhasRoutes = require("./routes/resenhasRoutes");
const leiturasRoutes = require("./routes/leiturasRoutes");

//Import Controller para rota depois da sessão iniciada
const homeController = require("./controllers/HomeController");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
conn();
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      // maxAge: 36000000,
      // expires: new Date(Date.now() + 36000000),
      httpOnly: true,
    },
  })
);

//set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
    res.locals.username = req.username;
  }

  next();
});
app.use(flash());

//Routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/resenhas", resenhasRoutes);
app.use("/leituras", leiturasRoutes);

//Rota depois da sessão ativa
app.use("/", homeController.home);

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
