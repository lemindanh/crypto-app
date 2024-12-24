import axios from 'axios';
import { MongoClient, ServerApiVersion } from 'mongodb';

// URL của API CoinGecko
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

// Kết nối MongoDB Atlas
const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority&appName=crypto-tracker';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function fetchAndSaveCoins() {
  try {
    // Gửi yêu cầu GET đến API CoinGecko
    const response = await axios.get(apiUrl);
    const coinsData = response.data;

    // Kết nối đến MongoDB
    await client.connect();

    // Lấy reference đến collection "coins" trong database "crypto-tracker"
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coins');

    // Xóa tất cả dữ liệu cũ trong collection 'coins' trước khi thêm mới
    await coinsCollection.deleteMany({});

    // Lưu dữ liệu mới vào MongoDB (sử dụng insertMany để thêm nhiều tài liệu cùng lúc)
    const result = await coinsCollection.insertMany(coinsData);
    console.log(`Successfully inserted ${result.insertedCount} coins into the database.`);

  } catch (error) {
    console.error('Error fetching or saving coin data:', error);
  } finally {
    // Đảm bảo đóng kết nối MongoDB sau khi hoàn thành
    await client.close();
  }
}

// Gọi hàm fetchAndSaveCoins để thực hiện công việc
fetchAndSaveCoins();
