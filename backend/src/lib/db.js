import {ENV} from './env.js'
import mongoose from 'mongoose'


export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Successfully connected to the database",conn.connection.host);
    }
    catch(err){
        console.error("Error occurred while connecting to DB",err);
        process.exit(1); // 0 - successful termination, 1 - error
    }
}