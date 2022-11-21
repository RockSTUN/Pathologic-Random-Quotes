//read .env file
const dotenv = require('dotenv')
//provides connection to the psqldb
import pg from 'pg'
const { Client } = require("pg")


dotenv.config()
 
const connectDb = async (callback = () => console.log('gimme callback')) => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
            
        })
 
        await client.connect()
        const res = await client.query(" SELECT name, quote FROM quotes LEFT JOIN characters ON quotes.character_id=characters.character_id")
        //console.log(res.rows)
        
        await client.end()
        callback(res);
        
    } catch (error) {
        console.log(error)
    }
    
   
    
}

// connectDb((value) => console.log(value.rows))


export default connectDb;
 



