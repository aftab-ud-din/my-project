import express from 'express';
import { 
    createTour,
    deleteTour, 
    getAllTour, 
    getSingleTour, 
    getTourBySearch,
    getFeaturedTour,
    getTourCount, 
    updateTour 
} from './../controllers/tourController.js';

const router = express.Router();

// create new tour
router.post('/', createTour);

// update tour
router.put('/:id', updateTour);

// delete new tour
router.delete('/:id', deleteTour);

// getSingle new tour
router.get('/:id', getSingleTour);

// getAll new tour
router.get('/', getAllTour);

// get tour by search
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getFeaturedTour",getFeaturedTour);
router.get("/search/getTourCount",getTourCount);

export default router;
