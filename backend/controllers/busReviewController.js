import Bus from "../models/Bus.js";
import Review from "../models/BusReview.js";


export const createReview = async (req, res) => {

    const busId = req.params.busId;
    const newReview = new Review({...req.body});

    try {
        const savedReview = await newReview.save();

    // after creating a new review now update the reviews array of the tour
    await Bus.findByIdAndUpdate(busId, {
        $push: {reviews: savedReview._id}
    })

    res.status(200).json
    ({
        success:true, 
        message: "Review submitted",
        data:savedReview
    })

    } catch (err) {
        res.status(500).json
        ({
            success:false,
            message:"failed to submit"
        })
    }
}