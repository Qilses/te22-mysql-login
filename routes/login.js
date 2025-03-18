import express from "express"
import pool from "../db.js"

const router = express.Router()

//bearbetar posten vi får av login, och skyddar datan mellan andvändaren och severn. aka middleware. 
router.use(express.urlencoded({ extended: true }))

//routes här under 
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    // Hämta användare från databasen
    const [users] = await pool.promise().query(
        'SELECT password_hash FROM user-login WHERE user_name'

    );
})

router.post("/dashboard", (req, res) => {
    res.render("dashboard.njk", {
        title: "blabago"
    })
})
export default router