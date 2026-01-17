const pool = require("../config/db")

const cartModel = {
    async findCard({byUser, status}){
        const sql = await pool.query('SELECT * FROM carts WHERE by_users = $1 AND status = $2', [byUser, status])
        if(sql.rows.length){
            return result.rows.id;
        }
    },
    async save({byUser, status}){
        const sql = await pool.query(`INSERT INTO carts(byUser, status) Values($1, $2) returning *`, [byUser, status])
        return sql.rows
    },
}

module.exports = cartModel