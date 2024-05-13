import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    walletBalance: { 
      type: mongoose.Types.ObjectId,
      ref: "Wallet"
    },
    isVendor:{
      type:Boolean,
      defualt:false
    }
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);
