import express from 'express';
import { getCoinDataFromAPIAndSave } from '../services/mongoGetCoinData.js';

const router = express.Router();

// Route lấy thông tin của 1 đồng coin và lưu vào MongoDB
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Lấy ID coin từ URL parameters
  try {
    const coinData = await getCoinDataFromAPIAndSave(id);  // Lấy dữ liệu và lưu vào DB
    res.json({ coin: coinData });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Unable to retrieve coin data" });
  }
});

export default router;
