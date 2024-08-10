import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  mongoose
    .connect(
      'mongodb+srv://EAP-Admin:Admin1234@cluster1.nq4izmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //mongoose.set('strictQuery', false);
      }
    )
    .then(() => {
      //console.log(`MongoDB connected: ${conn.connection.host}`);

      console.log('Connected Successfully');
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

connectDB();

export default connectDB;
