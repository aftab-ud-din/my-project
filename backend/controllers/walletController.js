import Wallet from '../models/Wallet.js';

const WalletController = {
  // Get wallet balance
  async getBalance(req, res) {
    try {
      const { userId } = req.query;
      // Find the wallet with the given userId
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      return res.json({ balance: wallet.balance });
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Top up wallet balance
  async topUp(req, res) {
    try {
      const { userId, amount } = req.body;
      // Find the wallet with the given userId
      let wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        // If wallet doesn't exist, create a new one
        wallet = new Wallet({ userId });
      }
      // Update the balance by adding the top-up amount
      wallet.balance += amount;
      // Save the updated wallet
      await wallet.save();
      return res.json({ message: 'Wallet balance topped up successfully' });
    } catch (error) {
      console.error('Error topping up wallet balance:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Deduct from wallet balance
  async deduct(req, res) {
    try {
      const { userId, amount } = req.body;
      // Find the wallet with the given userId
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      // Check if the balance is sufficient for deduction
      if (wallet.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      // Update the balance by deducting the amount
      wallet.balance -= amount;
      // Save the updated wallet
      await wallet.save();
      return res.json({ message: 'Amount deducted from wallet balance successfully' });
    } catch (error) {
      console.error('Error deducting from wallet balance:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export default WalletController;
