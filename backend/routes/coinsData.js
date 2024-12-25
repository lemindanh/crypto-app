import express from 'express';
import { getCoinsDataFromAPIAndSave } from '../services/mongoGet100Coins.js';

const router = express.Router();

// POST route to fetch and insert coins data
router.get('/', async (req, res) => {// Lấy ID coin từ URL parameters
  try {
    const coinsData = await getCoinsDataFromAPIAndSave();  // Lấy dữ liệu và lưu vào DB
    res.json({ coin: coinsData });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Unable to retrieve coin data" });
  }
});

export default router;
