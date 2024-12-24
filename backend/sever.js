import express from 'express';
import { MongoClient } from 'mongodb';
import axios from 'axios';  // Import axios để thực hiện GET request
import cors from 'cors';

// Khởi tạo express app
const app = express();
const port = 5000;

// Cấu hình middleware
app.use(cors());
app.use(express.json());  // Đảm bảo có thể sử dụng req.body nếu cần thiết

// MongoDB connection URI
const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';

// MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/coin/:id/:days', async (req, res) => {
  try {
    const { id, days } = req.params;  // Lấy ID coin và days từ URL parameters

    // Lấy dữ liệu biểu đồ từ CoinGecko API
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
    const coinData = response.data;

    // Kết nối đến MongoDB
    await client.connect();

    // Lấy reference đến collection "prices" trong database "crypto-tracker"
    const database = client.db('crypto-tracker');
    const pricesCollection = database.collection('prices');

    // Xóa tất cả dữ liệu cũ trong collection 'prices' trước khi thêm mới
    await pricesCollection.deleteMany({});

    // Lưu dữ liệu mới vào MongoDB (sử dụng insertOne để thêm một coin)
    const result = await pricesCollection.insertOne({
      id,
      prices: coinData.prices,
      total_volumes: coinData.total_volumes,
      market_caps: coinData.market_caps,
      timestamp: new Date().toISOString(), // Lưu thời gian lấy dữ liệu
    });

    console.log(`Successfully inserted the coin data into the database.`);

    // Trả về dữ liệu cho frontend
    res.json({
      prices: coinData.prices,
      total_volumes: coinData.total_volumes,
      market_caps: coinData.market_caps,
    });

  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Unable to retrieve coin data" });
  } finally {
    // Đảm bảo đóng kết nối MongoDB
    await client.close();
  }
});

// Lắng nghe tại port 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
