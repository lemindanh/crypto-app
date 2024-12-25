import express from 'express';
import bodyParser from 'body-parser';
import balanceRoute from './routes/balance.js';
import coinsDataRoute from './routes/coinsData.js'
import coinDataRoute from './routes/coinData.js'
import coinPricesRoute from './routes/coinPrices.js'
import cors from 'cors';
import { initializeCoinsData } from './services/initializeCoinsData.js';

const app = express();
const PORT = 5000;
app.use(cors());

app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

(async () => {
  await initializeCoinsData();
})();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/balance', balanceRoute);
app.use('/api/coins', coinsDataRoute);
app.use('/api/coin', coinDataRoute);
app.use('/api/prices', coinPricesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
