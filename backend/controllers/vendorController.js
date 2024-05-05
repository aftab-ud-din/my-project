import Vendor from '../models/Vendor.js';
import User from '../models/User.js';

//create Vendor
export const createVendor = async (req, res) => {
    const newVendor = new Vendor(req.body);
    try {
        const savedVendor = await newVendor.save();
        console.log(savedVendor)
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            $set: {
                // Assuming you want to update specific fields, add them here:
                isVendor: true,
                // other fields to update...
            }})
        res.status(200).json
        ({
            success:true, 
            message:'Successfully created',
            data:updatedUser
        });
    } catch (err) {
        res.status(500).json
        ({
            success: false, 
            message:'Failed to create. Try again'
        });
    }
};

//update Vendor
export const updateVendor = async (req, res) => {
    
    const id = req.params.id;

    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedVendor,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
}

//delete Vendor
export const deleteVendor = async (req, res) => {
    const id = req.params.id;
    try {
        await Vendor.findByIdAndDelete(id);
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

//getSingle Vendor
export const getSingleVendor = async (req, res) => {
    const id = req.params.id;
    try {
        const Vendor = await Vendor.findById(id);
            res.status(200).json({
            success: true,
            message: "Successfully found",
            data:Vendor
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }
}

//getAll Vendor
export const getAllVendor = async (req, res) => {
    
    try {
        const Vendors = await Vendor.find({});
            res.status(200).json({
            success: true,
            message: "Successfully",
            data:Vendors,
        });
    } catch (err) {
        res.status(404).json({ 
            success: false,
            message: "not found",
        });
    }
}