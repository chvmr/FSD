import mongoose from "mongoose";

const connectDB = async (mongoURI, dbName) => {
    try {
        await mongoose.connect(mongoURI, {
            dbName: dbName
        });

        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

export default connectDB;