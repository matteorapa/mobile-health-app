require('dotenv').config()
const mysql = require('mysql');

async function connectMySQL(){
    let connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
      });
      await connection.connect();
    return {connection}


}

export { connectMySQL }
