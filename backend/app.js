import express from 'express';
import bodyParser from 'body-parser';
import balanceRoute from './routes/balance.js';


const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.use('/balance', balanceRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
