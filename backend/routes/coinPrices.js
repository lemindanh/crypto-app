import express from 'express';
import { getCoinPricesAndSave } from '../services/mongoGetPrices.js';

const router = express.Router();

router.get('/:id/:days', getCoinPricesAndSave);

export default router;
