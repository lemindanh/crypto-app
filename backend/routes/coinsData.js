import express from 'express';
import axios from 'axios';
import { insertCoinsData, getCoinsData } from '../services/mongoGet100Coins.js';

const router = express.Router();
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

// POST route to fetch and insert coins data
router.post('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const coinsData = response.data;

    // Lưu dữ liệu vào MongoDB
    await insertCoinsData(coinsData);

    res.json({
      success: true,
      message: 'Dữ liệu đã được lưu vào MongoDB thành công!',
    });
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể lấy hoặc lưu dữ liệu.',
    });
  }
});

// GET route to fetch coins data
router.get('/', async (req, res) => {
  try {
    const coins = await getCoinsData();
    res.json({
      success: true,
      coins: coins,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Không thể lấy dữ liệu từ MongoDB.',
    });
  }
});

export default router;
