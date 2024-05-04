import express from 'express';
const router = express.Router();
import Wallet from '../controllers/walletController.js';

router.get('/balance', Wallet.getBalance);
router.post('/topup', Wallet.topUp);
router.post('/deduct', Wallet.deduct);


export default router;
