import "dotenv/config"
import express from "express"
import nunjucks from "nunjucks"
import bodyParser from "body-parser"
import morgan from "morgan"
  
import loginRouter from "./routes/login.js"

const app = express()
const port = 3000

//säger till att sevrver kan andvända sig av ditt och datt mappar
app.use(express.static("public"))


app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


nunjucks.configure('views', {
  autoescape: true,
  express: app,
})


app.get("/", async (req, res) => {
  res.render("login.njk", {
    title: "Loga in!", 
    message: "Skriv in ditt andvändar namn, email och lössenord för att loga in"
  })
})

//säger till servern att den ska andvända routes mappen

app.use("/login", loginRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})