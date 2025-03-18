import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import morgan from "morgan";
import bcrypt from "bcrypt";
import loginRouter from "./routes/login.js";

const app = express();
const port = 3000;
const saltRounds = 10;

// Säger till att servern kan använda sig av olika mappar
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", async (req, res) => {
  const textPassword = "robin";

  const password_hash = bcrypt.hash(textPassword, saltRounds);


  res.render("login.njk", {
    title: "Logga in!",
    message: "Skriv in ditt användarnamn, email och lösenord för att logga in",
  });
});

// Säger till servern att den ska använda routes-mappen
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
