const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');  // Import cors

const app = express();
const port = 3000;

app.use(cors()); 
app.use(bodyParser.json());

app.post('/Event/results', async (req, res) => {
  const { city } = req.body;

  try {
    const apiKey = '02f30586-6fa3-4dad-8e7c-6135eec4bb1d';

    const response = await axios.get(`https://api.scrape-it.cloud/scrape/google/events/?city=${city}`, {
      headers: {
        'x-api-key': apiKey,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
