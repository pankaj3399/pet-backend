import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { seedAdmin } from "../seed.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
            (`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongoDB connected !! DB: ${connectionInstance.connection.host}:${connectionInstance.connection.port}`);
        await seedAdmin()
    } catch (error) {
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;