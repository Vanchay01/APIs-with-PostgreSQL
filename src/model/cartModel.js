const pool = require("../config/db")

const cartModel = {
    async findCard({byUser, status}){
        console.log(byUser, status)
        const sql = await pool.query('SELECT * FROM carts WHERE by_users = $1 AND status = $2', [byUser, status])
        console.log("Model", sql.rows)
        if(sql.rows.length){
           return sql.rows;
        }
    },
    async save({byUser, status}){
        const sql = await pool.query(`INSERT INTO carts(by_users, status) Values($1, $2) returning *`, [byUser, status])
        console.log(sql.rows)
        return sql.rows
    },
    
}


module.exports = cartModel