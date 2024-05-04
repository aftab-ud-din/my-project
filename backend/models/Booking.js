import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
	  required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
	tourName: {
		type: String,
		required: true
	},
    fullName: {
      type: String,
      required: true,
    },
	guestSize: {
		type: Number,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	bookAt: {
		type: Date,
		required: true
	},
  },
  { timestamps: true }
);

export default mongoose.model("booking", bookingSchema);
