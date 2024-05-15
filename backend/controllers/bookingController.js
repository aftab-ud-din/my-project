import Booking from '../models/Booking.js';


//create booking
export const createBooking = async( req, res) => {
    const newBooking = Booking(req.body);
    try {  
        const savedBooking = await newBooking.save();

        res.status(200).json
        ({
            success:true, 
            message:"Your tour is booked", 
            data: savedBooking
        });
    } catch (err) {
        res.status(500).json({success: true, message:"internal server error"});
    }
}

//get single booking
export const getBooking = async( req, res) => {
    const id = req.params.id;
    try {  
        const book = await Booking.findById(id);

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

export const getUserBooking = async (req, res) => {
  const userId = req.query.userId;
  try {
    // Find bookings with the given userId
    const book = await Booking.find({ userId });

    if (book.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bookings not found for the user',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bookings found',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


//get all booking
export const getAllBooking = async( req, res) => {

    try {  
        const books = await Booking.find();

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

export const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
      await Booking.findByIdAndDelete(id);
          res.status(200).json({
          success: true,
          message: "Successfully deleted",
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          message: "Failed to deleted",
      });
  }
}
