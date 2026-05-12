const path = require('path');
const pg = require('pg');
require('dotenv').config({ path: path.join(__dirname, 'config', 'db-connection.env'), override: true });

const client = new pg.Client({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'facility_helpdesk_20260416'
});

(async () => {
  try {
    await client.connect();
    console.log('Connected to database');

    await client.query('ALTER TABLE app_user ADD COLUMN IF NOT EXISTS profile_photo TEXT');
    console.log('✓ Added profile_photo column to app_user');

    await client.end();
    console.log('\n✓ Migration completed successfully');
  } catch (err) {
    console.error('✗ Error:', err.message);
    try {
      await client.end();
    } catch {
      // ignore close errors
    }
    process.exit(1);
  }
})();