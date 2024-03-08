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

app.post('/Login', (req, res) => {
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

app.get('/vegetarian', (req, res) => {
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=' + `${API_KEY}` + '&number=9&tags=vegetarian';
    const options = {
        method: "GET",
            headers: {  
                "Content-Type": 'application/json'
                 },
    }

    return fetch (url, options)
        .then(res => res.json())
        .then((recipes) => {
            const data = recipes.recipes.map(item => ({
                id: item.id,
                title: item.title,
                image: item.image,
                summary: item.summary,
                instructions: item.instructions
            }))
            res.send(data);
        })

})

app.get('/popular', (req, res) => {
    const url = 'https://api.spoonacular.com/recipes/random?apiKey=' + `${API_KEY}` + '&number=9';
    const options = {
        method: "GET",
            headers: {  
                "Content-Type": 'application/json'
                 },
    }

    return fetch (url, options)
        .then(res => res.json())
        .then((recipes) => {
            const data = recipes.recipes.map(item => ({
                id: item.id,
                title: item.title,
                image: item.image,
                summary: item.summary,
                instructions: item.instructions
            }))
            res.send(data);
        })

})

// app.get('/searched/:name', (req, res) => {
//     console.log('hello');
//     const queryParams = {
//         name: 'lemon',
//       };
//     // const name = req.params.key;
//     const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + `${API_KEY}` + `&query=${queryParams}`;
//     const options = {
//         method: "GET",
//             headers: {  
//                 "Content-Type": 'application/json'
//                  },
//     }

//     return fetch (url, options)
//     .then(res => res.json())
//     .then((recipes) => {
//         const data = recipes.recipes.map(item => ({
//             title: item.title,
//             image: item.image,
//             summary: item.summary,
//             instructions: item.instructions,
//             ingredients: item.original
//         }))
//         res.send(data);
//     })

// });

app.get('/recipe/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error('Error fetching recipe details');
      }
  
      const recipeDetails = await response.json();
  
      const data = {
        id: recipeDetails.id,
        title: recipeDetails.title,
        image: recipeDetails.image,
        summary: recipeDetails.summary,
        instructions: recipeDetails.instructions,
        ingredients: recipeDetails.extendedIngredients,
      };
  
      res.json(data);
    } catch (error) {
      console.error('Error in fetching recipe details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
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

app.get('/users/firstname', (req, res) => {
    const userId = req.user.userId;
    db.query('SELECT firstName FROM users WHERE userId = ?', [userId], (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const firstName = results[0].firstName;
        res.json({ firstName });
    });
});

// app.get('/admin/check', (req, res) => {
//     const userId = req.params.userID;
//     db.query('SELECT admin FROM users WHERE userID = ?', [userId], (error, results) => {
//         if (error) {
//             console.error('Error querying database:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         const isAdmin = results.length > 0 && results[0].admin === 1;
//         res.json({ isAdmin });
//     });
// });

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
