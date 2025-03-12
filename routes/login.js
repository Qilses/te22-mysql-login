import express from "express"
import pool from "../db.js"

const router = express.Router()

//bearbetar posten vi får av login, och skyddar datan mellan andvändaren och severn. aka middleware. 
router.use(express.urlencoded({ extended: true }))

//routes här under 
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hämta användare från databasen
        const [users] = await pool.promise().query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );

        // kolla om andvändare finns 
        if (users.length === 0) {
            return res.status(401).send("Ogiltigt email eller lösenord");
        }

        const user = users[0];

        // Verifiera lösenord
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Ogiltigt email eller lösenord");
        }

        // Spara användarsession
        req.session.userId = user.id;
        req.session.username = user.name;

        // Omdirigera till användarens sida efter inloggning
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server fel!");
    }
})

router.post("/dashboard", (req, res) => {
    res.render("dashboard.njk", {
        title: "Testa att skapa DIN qvitt!",
        message: "Twitter finns inte!",
    })
})
export default router