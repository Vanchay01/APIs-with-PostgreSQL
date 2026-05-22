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
            created_at TIMESTAMP DEFAULT NOW()
        );
        
        CREATE TABLE IF NOT EXISTS category(
          id SERIAL PRIMARY KEY, 
          name VARCHAR(255) NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );  

        CREATE TABLE IF NOT EXISTS brand(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NULL,
          logo TEXT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS product(
          id SERIAL PRIMARY KEY,
          barcode VARCHAR(300) NULL,
          part_number VARCHAR(300) NULL,
          specification TEXT NULL,
          descriptions TEXT NULL,
          name VARCHAR(400) NULL,
          price DECIMAL(10, 2) NOT NULL,
          discount DECIMAL(10, 2) NOT NULL,
          by_category int NOT NULL,
          by_brand int NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (by_category) REFERENCES category(id),
          FOREIGN KEY (by_brand) REFERENCES brand(id)
        );

        CREATE TABLE IF NOT EXISTS favorite(
          id SERIAL PRIMARY KEY,
          by_user int NOT NULL,
          by_product int NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (by_user) REFERENCES users(id),
          FOREIGN KEY (by_product) REFERENCES product(id)
        );

        CREATE TABLE IF NOT EXISTS cart(
          id SERIAL PRIMARY KEY,
          by_user int NOT NULL,
          by_product int NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          FOREIGN KEY (by_product) REFERENCES product(id),
          FOREIGN KEY (by_user) REFERENCES users(id)
        );
    `);
    console.log("✅ All tables created - schema.js:72");
  } catch (err) {
    console.error("❌ Schema error: - schema.js:74", err.message);
  }
};

module.exports = schemaTable