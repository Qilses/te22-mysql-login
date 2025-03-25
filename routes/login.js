import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"


const router = express.Router()


//routes här under 
router.post("/", async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    // Hämta användare från databasen
    const [users] = await pool.promise().query(
        ` 
        SELECT * FROM users_login
        WHERE user_name = ?` , [username]

    );

    console.log(users)

    // Load hash from your password DB.
    bcrypt.compare(password, user_password, function (err, result) {
        console.logI("JIPPY")
    });
    bcrypt.compare(someOtherPlaintextPassword, hash, function (err, result) {
        console.log(":C")
    });

})

router.get("/test", (req, res) => {
    let user_password = "robin"
    bcrypt.hash(user_password, 10, function (err, hash) {
        // här får vi nu tag i lösenordets hash i variabeln hash
        console.log(hash)
    })

})

router.get("/dashboard", (req, res) => {
    res.render("dashboard.njk", {
        title: "blabago",

    })
});
export default router