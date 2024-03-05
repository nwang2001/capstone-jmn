const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "p@ssword",
    database: "cap_users"
})

app.post('/register', (req, res) => {
    const sql = `Insert into cap_users.users (firstName, lastName, email, password) values ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')`
    const emailCheck = `select * from users where email = '${req.body.email}'`
    db.query(emailCheck, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.send({ message: 'Email Already Exists' })
        } else {
            db.query(sql, (err, result) => {
                if (err) throw err;
                const sql2 = `Select * from cap_users.users where email = '${req.body.email}'`
                db.query(sql2, (err, result) => {
                    if (err) throw err;
                    return res.send({message: "User Register Success", user:result[0]})
                })    
            })
        }
    })
})

app.post('/login', (req, res) => {

    const sql = "SELECT * FROM cap_users.users WHERE email = ? AND password = ?";
    // const sql = "select * from cap_users.users"

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Login Failed");
        if (data.length > 0) {
            return res.json("Login Successfully")
        } else {
            return res.json("No Record")
        }
    })
});


app.listen(3500, () => {
    console.log("Listening on port 3500.");
})