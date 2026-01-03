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
  async findOne({favId}) {
    const sql = await pool.query(
      "Select * from favorites Where id = $1", [favId]
    );
    return sql.rows;
  },
  async deleteOne({ favId }) {
    const sql = await pool.query(
      "DELETE FROM favorites WHERE id = $1 Returning *",
      [favId]
    );
    return sql.rows;
  },
};

module.exports = favModel;
