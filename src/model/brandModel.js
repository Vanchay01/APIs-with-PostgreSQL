const pool = require('../config/db')

const brandModel = {
    async save({name}){
        const brand = await pool.query(`Insert into brands(name) Values($1) returning *`, [name])
        return brand.rows[0]
    },
    async find(){
        const brand = await pool.query("Select * from brands returning *")
        return brand.rows[0]
    },
    async findOne({id}){
        const brand = await pool.query(`Select * from brands where id = $1 returning *`, [id])
        return brand.rows[0]
    },
    async deleteOne({id}){
        const brand = await pool.query(`Delete from brands where id = $1 returning *`, [id])
        return brand.rows[0]
    },
    async updateOne({id, name}){
        const brand = await pool.query(`Update brands set name = $1 where id $2 returning *`, [id, name])
        return brand.rows[0]
    }
}

module.exports = brandModel