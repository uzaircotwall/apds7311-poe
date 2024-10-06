import './config.js';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './db/conn.js';
import authRoutes from './Routes/auth.js';
import postRoutes from  './Routes/post.js';

const app = express();
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

//Middleware
app.use(express.json());
app.use(helmet())
app.use(morgan('combined'));

//Routes
app.use('/api/auth',authRoutes);
app.use('/api',postRoutes);

//SSL Certificate and key
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}


https.createServer(options,app).listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})