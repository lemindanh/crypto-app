import express from 'express';
import { getStatsBinance } from '../services/binanceService.js';
import { getStatsKucoin } from '../services/kucoinService.js';
import { getStatsKraken } from '../services/krakenService.js';
import { getStatsOkx } from '../services/okxService.js';
import { getStatsGate } from '../services/gateService.js';

const router = express.Router();

// POST route to fetch balance
router.post('/', async (req, res) => {
    const receivedObject = req.body;

    const keys = Object.keys(receivedObject);
    const coin = keys[0].toUpperCase();
  
    console.log(`Fetching data for: ${coin}`);
    const dataBinance = await getStatsBinance(coin);
    const dataKucoin = await getStatsKucoin(`${coin}-USDT`);
    const dataKraken = await getStatsKraken(`${coin}USD`);
    const dataOkx = await getStatsOkx(`${coin}-USDT`);
    const dataGate = await getStatsGate(`${coin}_USDT`);
  
    if (dataBinance) {
      res.json({
        success: true,
        dataBinance: dataBinance,
        dataKucoin: dataKucoin,
        dataKraken: dataKraken,
        dataOkx: dataOkx,
        dataGate: dataGate
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Không thể lấy dữ liệu.',
      });
    }
});

export default router;
