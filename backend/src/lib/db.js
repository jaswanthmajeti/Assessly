import {ENV} from './env.js'
import mongoose from 'mongoose'



let connectionPromise = null;

export const connectDB = async () => {
    try {
        // Already connected
        if (mongoose.connection.readyState === 1) {
            return;
        }

        // Already connecting → wait
        if (mongoose.connection.readyState === 2 && connectionPromise) {
            await connectionPromise;
            return;
        }

        // Start new connection
        connectionPromise = mongoose.connect(ENV.DB_URL);
        const conn = await connectionPromise;

        console.log("Connected to DB:", conn.connection.host);

        connectionPromise = null;
        return conn;

    } catch (err) {
        connectionPromise = null;
        console.error("DB connection error:", err);
        throw err;
    }
};