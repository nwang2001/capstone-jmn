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

    return fetch(url, options)
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

    return fetch(url, options)
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

app.get('/searched/:ingredients', async (req, res) => {
    try {
        const ingredients = req.params.ingredients;
        const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredients}&number=9`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching recipe details: ${response.statusText}`);
        }

        const byIngredients = await response.json();

        // Map the array of recipes to a simpler format
        const data = byIngredients.map((recipe) => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
        }));

        res.json(data);
    } catch (error) {
        console.error('Error in fetching recipe details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

app.post('/users/firstname', (req, res) => {
    const userId = req.body.userId;
    db.query(`SELECT firstName FROM users WHERE userID = ?`, [userId], (error, results) => {
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

app.post('/users/saveAddress', (req, res) => {
    const { userId, address } = req.body;
    const sql = 'INSERT INTO addresses (userId, address) VALUES (?, ?)';
    db.query(sql, [userId, address], (error) => {
        if (error) {
            console.error('Error saving address:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Address saved successfully' });
    });
});

app.get('/users/getAddresses', (req, res) => {
    const { userId } = req.query;
    const sql = 'SELECT * FROM addresses WHERE userId = ?';
    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching addresses:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

app.get('/users/address/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT address FROM addresses WHERE userId = ?';
    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching address:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Address not found' });
        }
        const address = results[0].address;
        res.json({ address });
    });
});

app.delete('/users/deleteAddress/:addressId', (req, res) => {
    const addressId = req.params.addressId;
    const sql = 'DELETE FROM addresses WHERE id = ?';
    db.query(sql, [addressId], (error, result) => {
        if (error) {
            console.error('Error deleting address:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Address deleted successfully' });
    });
});

app.listen(3500, () => {
    console.log("Listening on port 3500.");
})
