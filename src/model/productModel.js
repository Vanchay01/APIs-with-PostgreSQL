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
};

module.exports = productModel;
