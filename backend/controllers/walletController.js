import Wallet from '../models/Wallet.js';

// Get wallet balance
export const getBalance = async (req, res) => {
  const userId = req.query.userId;
  try {  
    // Find the wallet with the given userId
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: wallet.balance,
    });
  } catch (err) {
    console.error('Error fetching wallet balance:', err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Top up wallet balance
export const topUp = async (req, res) => {
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
};

// Deduct from wallet balance
export const deduct = async (req, res) => {
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
};
