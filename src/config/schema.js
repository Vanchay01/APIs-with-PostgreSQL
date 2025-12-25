const pool = require("../config/db");

const schemaTable = async () => {
  try {
    await pool.query(`
        DO $$
            BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_type WHERE typname = 'user_role'
            ) THEN
            CREATE TYPE user_role AS ENUM ('user', 'admin', 'edit');
            END IF;
        END$$;

        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age VARCHAR(255) NULL,
            role user_role DEFAULT 'user',
            password VARCHAR(300) NOT NULL,
            createdDate TIMESTAMP DEFAULT NOW()
        );
    `);
    console.log("✅ All tables created");
  } catch (err) {
    console.error("❌ Schema error:", err.message);
  }
};

module.exports = schemaTable