import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"


const router = express.Router()

//bearbetar posten vi får av login, och skyddar datan mellan andvändaren och severn. aka middleware. 
router.use(express.urlencoded({ extended: true }))

//routes här under 
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    // Hämta användare från databasen
    const [users] = await pool.promise().query(
        "SELECT * FROM user-login WHERE name = namnfrånformulär"


    );
})
let user_password = "robin"
bcrypt.hash(user_password, 10, function(err, hash) {
	// här får vi nu tag i lösenordets hash i variabeln hash
	console.log(hash)
})


  

router.post("/dashboard", (req, res) => {
    res.render("dashboard.njk", {
        title: "blabago"
    })
});
export default router