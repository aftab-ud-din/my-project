import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
{   
	title: {
		type: String, 
        required: true
	},
	totalSeats: { 
        type: Number, 
        required: true 
    },
	pickup_address: {
		type: String,
		required: true 
		},
    drop_address: { 
		type: String,
		required: true 
	},
	sheduledAt: {
        type: Date,
        required: true
    },
    pick_up_time: {
		type: String,
		required: true 
		},
    price: {
		type: Number,
		required: true 
	},
     sleeper : {
		 type : Boolean,
		 required : true
	}, 
     ac : {
		 type : Boolean,
		 required : true
	},
	availableSeats: { 
		type: [Number], 
		required: true 
	},
	photo: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	reviews: [
		{
			type: mongoose.Types.ObjectId,
			ref: "BusReview",
		},
	],
	distance: {
		type: Number,
		required: true 
	},

},
{ timestamps: true }
);

export default mongoose.model("Bus", busSchema);

	

		 

