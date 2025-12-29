const pool = require('../config/db')

const brandModel = {
    async save({name}){
        const brand = await pool.query(`
            Insert into brands(name)
            Values($1) Returning *
        `, [name])
        return brand.rows[0]
    }
}

module.exports = brandModel