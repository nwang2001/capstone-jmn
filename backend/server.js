const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const API_KEY = process.env.API_KEY;

const db = mysql2.createConnection({
    host: "sql5.freesqldatabase.com",
    user: "sql5688989",
    password: "WgektIAJPw",
    database: "sql5688989"
})

app.post('/register', (req, res) => {
    const sql = `Insert into users (firstName, lastName, email, password) values ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.password}')`
    const emailCheck = `select * from users where email = '${req.body.email}'`
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
                    return res.send({message: "User Register Success", user:result[0]})
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
            return res.json("Login Successfully")
        } else {
            return res.json("No Record")
        }
    })
});


app.get('/vegetarian', (req, res) => {
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=' + `${API_KEY}` + '&number=9&tags=vegetarian';
    const options = {
        method: "GET",
            headers: {  
                // Authorization: process.env.APIKEY,  
                "Content-Type": 'application/json'
                 },
    }

    return fetch (url, options)
        .then(res => res.json())
        .then((recipes) => {
            const data = recipes.recipes.map(item => ({
                title: item.title,
                image: item.image,
                summary: item.summary,
                instructions: item.instructions
            }))
            // res.send(recipes.recipes[0].title)
            res.send(data);
        })

})

app.get('/popular', (req, res) => {
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=' + `${API_KEY}` + '&number=9';
    const options = {
        method: "GET",
            headers: {  
                // Authorization: process.env.APIKEY, 
                "Content-Type": 'application/json'
                 },
    }

    return fetch (url, options)
        .then(res => res.json())
        .then((recipes) => {
            const data = recipes.recipes.map(item => ({
                title: item.title,
                image: item.image,
                summary: item.summary,
                instructions: item.instructions
            }))
            // res.send(recipes.recipes[0].title)
            res.send(data);
        })

})


app.listen(3500, () => {
    console.log("Listening on port 3500.");
})
