const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a PostgreSQL (Asegúrate de que esta URL sea correcta)
const pool = new Pool({
    connectionString: 'postgresql://postgres:KoAhRTsHVPEnTVAzryXhCFdpHRZSxOSq@autorack.proxy.rlwy.net:49504/railway',
});

app.use(bodyParser.json());

// Ruta principal que indica que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando. Usa /api/survey para enviar datos.');
});

// Ruta para guardar respuestas en la base de datos
app.post('/api/survey', async (req, res) => {
    const { response } = req.body;
    
    if (!response) {
        return res.status(400).json({ error: 'Response is required' });
    }

    try {
        // Inserta la respuesta en la tabla 'encuestas'
        const result = await pool.query('INSERT INTO encuestas (response) VALUES ($1) RETURNING id, response, fecha', [response]);

        // Envía una respuesta al frontend indicando que la respuesta se guardó correctamente
        res.status(201).json({
            message: 'Response saved',
            result: result.rows[0],  // Enviar solo la fila insertada, no toda la consulta
        });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ error: 'Error saving response' });
    }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
