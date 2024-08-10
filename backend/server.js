import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import checkAuthRoute from './routes/checkAuthRoute.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = 8000 || process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Api is running');
});

//cookie parser
//this will allow us to access req.cookies
//we will be able to acccess req.cookies.jwt
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/users/check-auth', checkAuthRoute);
//app.use(errorHandler());

app.listen(port, () => {
  console.log(`Application is running successfully on ${port}`);
});
