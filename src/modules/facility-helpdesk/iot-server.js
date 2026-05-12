const { Pool } = require('pg');

// ================= DATABASE =================

// Menggunakan database bawaan facility_helpdesk
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME || 'facility_helpdesk_20260416',
    password: process.env.DB_PASSWORD || 'Radhiyya1512',
    port: process.env.DB_PORT || 5432,
});

// ================= TEST =================

pool.connect()
.then(() => {
    console.log('PostgreSQL Connected to iot database (via Facility Helpdesk)');
})
.catch(err => {
    console.log('Database Error:', err);
});

module.exports = function initIotRoutes(app) {
    // ================= API INSERT DATA =================
    app.post('/api/data', async (req, res) => {
        try {
            const { voltage, power, energy } = req.body;

            await pool.query(
                `INSERT INTO energy_data(voltage, power, energy)
                 VALUES($1,$2,$3)`,
                [voltage, power, energy]
            );

            res.json({
                success: true,
                message: 'Data saved'
            });
        } catch(err){
            console.log(err);
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    });

    // ================= API GET DATA =================
    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.query(
                `SELECT * FROM energy_data
                 ORDER BY id DESC
                 LIMIT 50`
            );

            res.json(result.rows);
        } catch(err){
            console.log(err);
            res.status(500).json({
                success: false
            });
        }
    });

    // ================= TEST ROOT =================
    app.get('/api/iot-status', (req, res) => {
        res.send('IoT API Running inside Facility Helpdesk backend');
    });
};