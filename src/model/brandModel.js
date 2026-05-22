const pool = require("../config/db");
const brandModel = {
  async save({ name }) {
    const brand = await pool.query(
      `Insert into brand(name) Values($1) returning *`,
      [name]
    );
    return brand.rows;
  },
  async find() {
    const brand = await pool.query(
      "SELECT * FROM brand ORDER BY created_at DESC"
    );
    return brand.rows;
  },
  async findOne({ id }) {
    const brand = await pool.query(`Select * from brand where id = $1`, [id]);
    return brand.rows;
  },
  async deleteOne({ id }) {
    const brand = await pool.query(
      `Delete from brand where id = $1 returning *`,
      [id]
    );
    return brand.rows;
  },
  async updateOne({id, name}) {
    const brand = await pool.query(
      `Update brand set name = $1 where id = $2 returning *`,
      [name, id]
    );
    return brand.rows;
  },
};

module.exports = brandModel;
