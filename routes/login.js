import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"


const router = express.Router()


//routes här under 
router.post("/", async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    // Hämta användare från databasen
    const [result] = await pool.promise().query(
        ` 
        SELECT * FROM users_login
        WHERE user_name = ?` , [username]

    );

    if (result[0] == undefined) {
        res.render("login.njk", {
            title: "Logga in!",
            message: "Username or password wrong!",
        })
    } else {
        bcrypt.compare(password, result[0].user_password, function (err, result) {
            if (result == true) {
                res.render("dashboard.njk", {})
            } else {
                res.render("login.njk", {
                    title: "Logga in!",
                    message: "Username or password wrong!",
                })

            }
        });
    }
}

)

router.get("/newuser", (req, res) => {
    let user_password = "robin"
    res.render("newuser.njk", {
        title: "CREATE A NEW USER!",    
        message:"Set a Username, password and a email to create a new user :)"
    })
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