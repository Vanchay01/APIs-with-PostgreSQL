const pool = require("../config/db");

const userModel = {
  async getAll({ page, limit }) {
    const offset = (page - 1) * limit;
    const users = await pool.query(
      `
        SELECT * FROM users
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    `,
      [limit, offset]
    );
    const countUser = pool.query("SELECT COUNT(*) FROM users");
    return {
      user: users.rows,
      totalUser: Number((await countUser).rows[0].count),
    };  
  },
  async findById({id}){
    const user = await pool.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id])
    return user.rows[0]
  },
  async deleteById({id}){
    const user = await pool.query(`
      DELETE FROM users
      WHERE id = $1
    `, [id])
    if (user.rowCount === 0){
      return null
    }
    return true
  },
  
  async updateById({id, username, address, phone_number, age, sex, birth}){
    const user = await pool.query(`
      UPDATE users
      SET 
        username = $1, 
        address = $2, 
        phone_number = $3, 
        age = $4, 
        sex = $5, 
        birth = $6
      WHERE id = $7
    `, [username, address, phone_number, age, sex, birth, id])
    console.log(user)
    return user.rowCount
  }
};
module.exports = userModel;
