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
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
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
      `,
      [brand || null, category || null]
    );
    return product.rows;
  },

  async updateOne({
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
    id,
  }) {
    console.log(
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
      id
    );
    const data = await pool.query(
      `
      Update products
      Set
        barcode = $1,
        name = $2,
        part_number = $3,
        description = $4,
        specification = $5,
        price = $6,
        discount = $7,
        warranty = $8,
        by_brands = $9,
        by_categories = $10
      Where id = $11 Returning *
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
        id,
      ]
    );
    return data.rows;
  },

  async deleteOne({ id }) {
    const data = await pool.query(
      `Delete from products where id = $1 returning *`,
      [id]
    );
    return data.rows;
  },

  async findOne({ id }) {
    const brand = await pool.query(`Select * from products where id = $1`, [id]);
    return brand.rows;
  },
};


module.exports = productModel;
