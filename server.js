import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import morgan from "morgan";
import loginRouter from "./routes/login.js";
import session from "express-session"

const app = express();
const port = 3000;
const saltRounds = 10;

// Säger till att servern kan använda sig av olika mappar
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cookies
app.use(session({
  secret: `keyboard cat`,
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}))


nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", async (req, res) => {
  //cookies
  if (req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1
  }
  console.log(req.session.views)
  res.render("login.njk", {
    title: "Logga in!",
    message: "Skriv in ditt användarnamn, email och lösenord för att logga in",
  });


});


// Säger till servern att den ska använda routes-mappen
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
