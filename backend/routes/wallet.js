import express from 'express';
import { getBalance, topUp, deduct } from '../controllers/walletController.js';

const router = express.Router();

router.get('/balance', getBalance);
router.post('/topup', topUp);
router.post('/deduct', deduct);


export default router;
