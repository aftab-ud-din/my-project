import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Types.ObjectId,
        ref:'User',
    },

    phone: {
		type: Number,
		required: true
	},

  license: {
		type: Number,
		required: true
	},

  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
