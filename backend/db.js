import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        dbName: '#####',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to the MongoDB successfuly");
    }).catch((err) => {
        console.log(`MongoDB connection err:, ${err}`);
    })
};

export default conn;