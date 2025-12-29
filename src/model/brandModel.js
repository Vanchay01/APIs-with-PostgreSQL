const pool = require("../config/db");
const brandModel = {
  async save({ name }) {
    const brand = await pool.query(
      `Insert into brands(name) Values($1) returning *`,
      [name]
    );
    return brand.rows;
  },
  async find() {
    const brand = await pool.query(
      "SELECT * FROM brands ORDER BY created_at DESC"
    );
    return brand.rows;
  },
  async findOne({ id }) {
    const brand = await pool.query(`Select * from brands where id = $1`, [id]);
    return brand.rows;
  },
  async deleteOne({ id }) {
    const brand = await pool.query(
      `Delete from brands where id = $1 returning *`,
      [id]
    );
    return brand.rows;
  },
  async updateOne({id, name}) {
    const brand = await pool.query(
      `Update brands set name = $1 where id = $2 returning *`,
      [name, id]
    );
    return brand.rows;
  },
};

module.exports = brandModel;
