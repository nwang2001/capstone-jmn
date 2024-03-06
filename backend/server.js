const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
    host: "sql5.freesqldatabase.com",
    user: "sql5688989",
    password: "WgektIAJPw",
    database: "sql5688989"
})

app.post('/register', (req, res) => {
    const sql = `Insert into users (firstName, lastName, email, password) values ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')`
    const emailCheck = `SELECT * from users where email = '${req.body.email}'`
    db.query(emailCheck, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.send({ message: 'Email Already Exists' })
        } else {
            db.query(sql, (err, result) => {
                if (err) throw err;
                const sql2 = `Select * from users where email = '${req.body.email}'`
                db.query(sql2, (err, result) => {
                    if (err) throw err;
                    return res.send({ message: "User Register Success", user: result[0] })
                })
            })
        }
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Login Failed");
        if (data.length > 0) {
            if (data[0].admin === 1) {
                return res.json({ message: "Login Successful", isAdmin: true, data });
            } else {
                return res.json({ message: "Login Successful", isAdmin: false, data });
            }
        } else {
            return res.json("No Record")
        }
    })
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.json(data);
    });
});

app.delete('/users/:userID', (req, res) => {
    const userID = req.params.userID;
    console.log(userID)
    const sql = `DELETE FROM users WHERE userID = ${userID}`;
    db.query(sql, [userID], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete user." });
        }
        return res.json({ message: "User deleted successfully." });
    });
});

app.listen(3500, () => {
    console.log("Listening on port 3500.");
})