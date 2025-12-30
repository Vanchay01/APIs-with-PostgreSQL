const pool = require("../config/db");
const categoryModel = {
  async save({ name }) {
    const data = await pool.query(
      `Insert into categories(name) Values($1) returning *`,
      [name]
    );
    return data.rows;
  },
  async find() {
    const data = await pool.query(
      "SELECT * FROM categories ORDER BY created_at DESC"
    );
    return data.rows;
  },
  async findOne({ id }) {
    const data = await pool.query(`Select * from categories where id = $1`, [id]);
    return data.rows;
  },
  async deleteOne({ id }) {
    const data = await pool.query(
      `Delete from categories where id = $1 returning *`,
      [id]
    );
    return data.rows;
  },
  async updateOne({id, name}) {
    const data = await pool.query(
      `Update categories set name = $1 where id = $2 returning *`,
      [name, id]
    );
    return data.rows;
  },
};

module.exports = categoryModel;
