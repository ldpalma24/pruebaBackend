const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: 'postgresql://postgres:KoAhRTsHVPEnTVAzryXhCFdpHRZSxOSq@autorack.proxy.rlwy.net:49504/railway',
});

app.use(bodyParser.json());

app.post('/api/survey', async (req, res) => {
    const { response } = req.body;
    try {
        const result = await pool.query('INSERT INTO responses (response) VALUES ($1)', [response]);
        res.status(201).json({ message: 'Response saved', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving response' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
