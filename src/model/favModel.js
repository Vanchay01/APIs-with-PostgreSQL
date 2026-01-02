const pool = require("../config/db");

const favModel = {
  async findfavById({ by_products, by_users }) {
    const sql = await pool.query(
      "Select * from favorites where by_products = $1 and by_users = $2",
      [by_products, by_users]
    );
    return sql.rows;
  },

  async save({ by_products, by_users }) {
    const existing = await this.findfavById({
      by_products: by_products,
      by_users: by_users,
    });
    if (existing) {
      return json({ message: "Already favorited", status: 400 });
    }
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
