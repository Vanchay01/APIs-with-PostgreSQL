const pool = require("../config/db")

const favModel = {
    async save({by_products, by_users}){
      const data = await pool.query("Insert into favorites(by_products, by_users) Values($1, $2) Returning *", [by_products, by_users])  
    },
    async find(){
      const data = await pool.query("Select * from favorites order by created_at DESC")  
    },
    async deleteOne({by_products, by_users}){
      const data = await pool.query("Delete from favorites where by_products = $1, by_users = $2", [by_products, by_users])  
    },
}


module.exports = favModel