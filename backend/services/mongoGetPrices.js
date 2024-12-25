import { MongoClient } from 'mongodb';
import axios from 'axios';  // Import axios để thực hiện GET request

// MongoDB connection URI
const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';

// MongoDB client
const client = new MongoClient(uri);


// Hàm để lấy dữ liệu từ CoinGecko và lưu vào MongoDB
export const getCoinPricesAndSave = async (req, res) => {
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

    // Lưu dữ liệu mới vào MongoDB
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
};
