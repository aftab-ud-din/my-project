import BusBooking from '../models/BusBooking.js';
import mongoose from 'mongoose';

//create booking
export const createBooking = async (req, res) => {
    const newBooking = req.body;
    const userId = newBooking.userId;
    const busId=newBooking.busId;
    const userEmail = newBooking.userEmail;
    const fullName = newBooking.fullName;
    const phone = newBooking.phone;
    const seatsBooked = newBooking.seatsBooked;
    const bookAt = newBooking.bookAt;

    console.log(newBooking);

    try {
        const busbooked = await BusBooking.create({
            userId: userId,
            userEmail: userEmail,
            fullName: fullName,
            phone: phone,
            busId:busId,
            seatsBooked: seatsBooked,
            bookAt: bookAt
        });

        console.log("Booking successful");
        res.status(200).json({
            success: true,
            message: "Your tour is booked",
            data: busbooked
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


//get single booking
export const getBooking = async( req, res) => {
    const id = req.params.id;
    try {  
        const book = await BusBooking.findById(id);

        res.status(200).json
        ({
            success:true, 
            message:"Successfully found", 
            data: book,
        });
    } catch (err) {
        res.status(404).json({success: true, message:"Not Found"});
    }
}


//get all booking
export const getAllBooking = async( req, res) => {

    try {  
        const books = await BusBooking.find();

        res.status(200).json
        ({
            success:true, 
            message:"Successfully found", 
            data: books,
        });
    } catch (err) {
        res.status(404).json({success: true, message:"internal server error"});
    }
}


export const getAllBookedSeats = async (req, res) => {
    const busId = req.params.id; // Ensure your route is setup to capture :id
    const bus_id=new mongoose.Types.ObjectId(busId);
    try {
        const allBookings = await BusBooking.find({ busId: bus_id });
        console.log(allBookings)
        let bookedSeats = allBookings.reduce((acc, booking) => acc.concat(booking.seatsBooked), []);

        res.status(200).json({
            success: true,
            message: "Successfully fetched all booked seats",
            data: bookedSeats // returning only the seats booked
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};