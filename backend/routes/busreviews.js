import express from 'express'
import { createReview } from '../controllers/busReviewController.js'
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:busId', createReview )

export default router
