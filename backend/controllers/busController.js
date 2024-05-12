import Bus from '../models/Bus.js';


//create new Bus
export const createBus = async (req, res) => {
    const newBus = new Bus(req.body)
    try {
        const savedBus = await newBus.save();
        res.status(200).json
        ({
            success:true, 
            message:'Successfully created',
            data:savedBus
        });
    } catch (err) {
        res.status(500).json
        ({
            success: false, 
            message:'Failed to create. Try again'
        });
    }
};

//update Bus
export const updateBus = async (req, res) => {
    
    const id = req.params.id;

    try {
        const updatedBus = await Bus.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})
        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedBus,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
}

//delete Bus
export const deleteBus = async (req, res) => {
    const id = req.params.id;
    try {
        await Bus.findByIdAndDelete(id);
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

//getSingle Bus
export const getSingleBus = async (req, res) => {
    const id = req.params.id;
    try {
        const bus = await Bus.findById(id)
        .populate("reviews");

        res.status(200).json({
            success: true,
            message: "Successfully found",
            data:bus
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "not found any",
        });
    }
}

//getAll Bus
export const getAllBus = async (req, res) => {
    
    //for pagination
    const page= parseInt(req.query.page);

    try {
        const Buses = await Bus.find({})
        .populate("reviews")
        .skip(page * 8)
        .limit(8);

        res.status(200).json({
            success: true,
            count: Buses.length,
            message: "Successfully",
            data:Buses,
        });
    } catch (err) {
        res.status(404).json({ 
            success: false,
            message: "not found",
        });
    }
}
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const searchBuses = async (req, res) => {
    try {
        let { page = 0 } = req.query;
        page = parseInt(page) || 0;
        const pageSize = 8;
        const skip = page * pageSize;

        let filter = {};

        // Iterate over all query parameters
        for (let key in req.query) {
            if (key.includes('price')) {
                // Extract the operator and value
                const operator = key.includes('<') ? '$lt' : key.includes('>') ? '$gt' : '$eq';
                let value = req.query[key].replace('=', '').trim(); // Remove '=' and trim whitespace
                value = parseFloat(value);
                if (!isNaN(value)) {
                    filter.price = { [operator]: value };
                }
            } else if (key.includes('distance')) {
                const operator = key.includes('<') ? '$lt' : key.includes('>') ? '$gt' : '$eq';
                let value = req.query[key].replace('=', '').trim();
                value = parseFloat(value);
                if (!isNaN(value)) {
                    filter.distance = { [operator]: value };
                }
            } if (key === 'drop_address' || key === 'pickup_address') {  // Changed from 'source_address' to 'pickup_address'
                filter[key] = { $regex: new RegExp(escapeRegex(req.query[key]), 'i') };
            }
        }

        console.log('Filter used for search:', JSON.stringify(filter));

        if (Object.keys(filter).length === 0) {
            return res.json({
                success: true,
                message: "No valid search parameters provided. Returning all records.",
                data: [],
                total: 0,
                page: page,
                pages: 0
            });
        }

        const [buses, total] = await Promise.all([
            Bus.find(filter).skip(skip).limit(pageSize),
            Bus.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: buses,
            total: total,
            page: page,
            pages: Math.ceil(total / pageSize)
        });
    } catch (error) {
        console.error("Error searching buses:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve bus data due to an error: ' + error.message
        });
    }
};





export const getBusBySearch = async(req,res)=> {

    //here 'i' means case sensitive
    const price =parseInt(req.query.price);
    const drop_address = new RegExp(req.query.drop_address);
    const distance =parseInt(req.query.distance);

    try {

        //gte means greater than equal to
        const Buses = await Bus.find({
            price:{$gte:price}, 
            drop_address,
            distance:{$gte:distance}
        }).populate("reviews");

        res.status(200).json({
            success: true,
            message: "Successfully",
            data:Buses,
        });
    } catch (err) {
        res.status(404).json({ 
            success: false,
            message: "not found",
        });
    }
}

    //get Bus count
    export const getBusCount = async(req, res) => {
        try {
            const BusCount = await Bus.estimatedDocumentCount();
                res.status(200).json({
                success: true,
                data:BusCount
            });
        } catch (err) {
            res.status(500).json({ 
                success: false,
                message: "Failed to fetch"
            });
        }
   }