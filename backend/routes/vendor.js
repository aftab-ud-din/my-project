import express from 'express'
import { 
    createVendor,
    updateVendor,
    deleteVendor,
    getSingleVendor,
    getAllVendor
 } from '../controllers/vendorController.js';
const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';


// create Vendor
router.post('/', createVendor);
// update Vendor
router.put('/:id', verifyUser, updateVendor);
// delete Vendor
router.delete('/:id', verifyUser, deleteVendor);
// getSingle  Vendor
router.get('/:id', verifyUser, getSingleVendor);
// getAll all Vendor
router.get('/', verifyAdmin,getAllVendor);

export default router;