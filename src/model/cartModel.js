const { Result } = require("pg");
const pool = require("../config/db");

const cartModel = {
  async findOrAddCard({ byUser }) {
    const find = await pool.query(
      `SELECT * FROM carts WHERE by_users = $1 AND status = 'active'`,
      [byUser],
    );
    if (find.rows.length) {
      return find.rows[0].id;
    }
    const newCart = await pool.query(
      `INSERT INTO carts(by_users) VALUES($1) RETURNING *`,
      [byUser],
    );
    return newCart.rows[0].id;
  },

  async addToCart({ byUser, byProduct, quantity }) {
    console.log(byUser, byProduct, quantity)
    const byCart = await cartModel.findOrAddCard({byUser: byUser});
    console.log("Card==", byCart)
    const {sql} = await pool.query(
      `INSERT INTO cart_items(by_cart, by_product, quantity, price)
        VALUES(
            $1, $2, $3,
            (SELECT price FROM products Where id = $2)
        )
        ON CONFLICT (by_cart, by_product)   
        DO UPDATE
        SET quantity = cart_items.quantity + EXCLUDED.quantity RETURNING *
        `,
      [byCart, byProduct, quantity],
    );
    console.log(sql[0])
    return sql[0];
  },
};

module.exports = cartModel;
