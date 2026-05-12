const { Client } = require('pg');

async function setup() {
    // Connect to default 'postgres' database first to create 'iot' database
    const client1 = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'Radhiyya1512',
        port: 5432,
        database: 'postgres'
    });
    
    try {
        await client1.connect();
        await client1.query('CREATE DATABASE iot');
        console.log('Database "iot" created successfully.');
    } catch(e) {
        console.log('Database "iot" might already exist or error occurred:', e.message);
    } finally {
        await client1.end();
    }

    // Connect to the new 'iot' database to create the table
    const client2 = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'Radhiyya1512',
        port: 5432,
        database: 'iot'
    });

    try {
        await client2.connect();
        await client2.query(`
            CREATE TABLE IF NOT EXISTS energy_data (
                id SERIAL PRIMARY KEY,
                voltage FLOAT,
                power FLOAT,
                energy FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Table "energy_data" created successfully.');
    } catch(e) {
        console.error('Error creating table:', e.message);
    } finally {
        await client2.end();
    }
}

setup();