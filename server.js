import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'


//env config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

//Port
const PORT = process.env.PORT || 8080;
const DEV_MODE = process.env.DEV_MODE;

//listen
app.listen(PORT,() =>{
      console.log(`Server Running on ${DEV_MODE} mode Port on ${PORT}`.bgCyan.white)
})