import mongoose from 'mongoose';

const connectDB = (mongoUri) => {
    mongoose.connect(mongoUri)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Problem while connecting MongoDB", err);
        });
};

export default connectDB;