const pool = require("../config/db");

const favModel = {
  async findfavById({ by_products, by_users }) {
    const sql = await pool.query(
      "Select * from favorites where by_products = $1 and by_users = $2",
      [by_products, by_users]
    );
    console.log(sql.rowCount)
    return sql.rowCount;
  },

  async save({ by_products, by_users }) {
    const sql = await pool.query(
      "Insert into favorites(by_products, by_users) Values($1, $2) Returning *",
      [by_products, by_users]
    );
    return sql.rows;
  },
  async find() {
    const sql = await pool.query(
      "Select * from favorites order by created_at DESC"
    );
    return sql.rows;
  },
  async deleteOne({ by_products, by_users }) {
    const sql = await pool.query(
      "Delete from favorites where by_products = $1, by_users = $2",
      [by_products, by_users]
    );
    return sql.rows;
  },
};

module.exports = favModel;
