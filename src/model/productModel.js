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
    return products.rows[0];
  },

  async filter({ brand, category }) {
    console.log(brand, category);
    const product = await pool.query(
      `
        Select 
        p.id,
        p.barcode,
        p.name,
        p.part_number,
        p.description,
        p.specification,
        p.price,
        p.discount,
        p.warranty,
        b.name as brands,
        c.name as categories,
        p.created_at
        from products p
        join brands b on p.by_brands = b.id
        join categories c on p.by_categories = c.id
        Where 
            ($1::text is null or lower(b.name) = lower($1))
        and
            ($2::text is null or lower(c.name) = lower($2))
        Order by p.created_at DESC;
      `,[brand || null, category || null]
    );
    return product.rows;
  },
};

module.exports = productModel;
