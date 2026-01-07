const pool = require("../config/db")

const cartModel = {
    async save({byUser, status}){
        const sql = await pool.query(`INSERT INTO carts(byUser, status) Values($1, $2) returning *`, [byUser, status])
        return sql.rows
    }
    
}

module.exports = cartModel