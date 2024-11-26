const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: 'postgresql://postgres:KoAhRTsHVPEnTVAzryXhCFdpHRZSxOSq@autorack.proxy.rlwy.net:49504/railway',
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando. Usa /api/survey para enviar datos.');
});


app.post('/api/survey', async (req, res) => {
    const { response } = req.body;
    try {
        const result = await pool.query('INSERT INTO encuestas (response) VALUES ($1)', [response]);
        res.status(201).json({ message: 'Response saved', result });
    } catch (error) {
        console.error('Error al guardar en la base de datos:', error);
        res.status(500).json({ error: 'Error saving response', details: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
