import mongoose from "mongoose";

const busBookingSchema = new mongoose.Schema(
{
    userId: {
      type: mongoose.Types.ObjectId,
	  required: true,
    },
    userEmail: {
        type: String,
        required: true,
      },
    busId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Bus',
    },
    fullName: {
        type: String,
        required: true,
      },
    seatsBooked: { 
        type: [Number], 
  
    },
    phone: {
		type: Number,
		required: true
	},

    bookAt: {
		type: Date,

	}
},
{ timestamps: true }
);

export default mongoose.model("busBooking", busBookingSchema);
