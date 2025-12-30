const pool = require("../config/db");

const productModel = {
  async save({
    barcode,
    name,
    part_number,
    description,
    specification,
    price,
    discount,
    warranty,
    by_categories,
    by_brands,
  }) {
    const products = await pool.query(
      `
            INSERT INTO products(barcode, name, part_number, description, specification, price, discount, warranty, by_categories, by_brands)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
        `,
      [
        barcode,
        name,
        part_number,
        description,
        specification,
        price,
        discount,
        warranty,
        by_categories,
        by_brands,
      ]
    );  
    return  products.rows[0]
  },

  async filter({brand, category}){
    const data = await pool.query(`
      SELECT p.id, p.name, p.price, b.name AS brands, c.name AS categories
      FROM products p
      JOIN brands b ON b.id = p.by_brands
      JOIN categories c ON c.id = p.by_categories
      WHERE
        ($1::TEXT IS NULL OR LOWER(b.name) = LOWER($1))
        AND
        ($2::TEXT IS NULL OR LOWER(c.name) = LOWER($2))
    `, [brand || null, category || null])
    return data.rows
  }
};

module.exports = productModel;
