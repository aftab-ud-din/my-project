import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import tourRoute from './routes/tour.js';
import busRoute from './routes/bus.js';
import userRoute from './routes/user.js';
import walletRoute from './routes/wallet.js';
import vendorRoute from './routes/vendor.js';
import reviewRoute from './routes/reviews.js';
import busReviewRoute from './routes/busreviews.js';
import bookingRoute from './routes/bookings.js';
import busbookingRoute from './routes/busbookings.js';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin:true,
    credentials:true
}

// database connection
mongoose.set("strictQuery", false);
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB database connected")
    } catch (err) {
        console.log("MongoDB database connection failed")
    }
}


//midleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/buses', busRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/wallets', walletRoute);
app.use('/api/v1/vendors', vendorRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/busreview', busReviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/busbooking', busbookingRoute);

 
app.listen(port, ()=>{
    connect();
    console.log(
        'server listening on port', 
        port
        )
})