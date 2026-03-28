import {ENV} from './env.js'
import mongoose from 'mongoose'



export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return; // already connected
        }

        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to DB:", conn.connection.host);
    } catch (err) {
        console.error("DB connection error:", err);
        throw err; 
    }
};