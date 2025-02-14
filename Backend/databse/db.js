// lets connect mongodb as a database to our project
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected`);

    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;