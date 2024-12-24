import axios from 'axios';
import { MongoClient } from 'mongodb';

// MongoDB connection URI
const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';

// MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const apiUrl = 'https://api.coingecko.com/api/v3/coins/';

export async function getCoinDataFromAPIAndSave(id) {
  // Lấy dữ liệu từ API
  const response = await axios.get(apiUrl + `${id}`);
  const coinData = response.data;

  // Kết nối đến MongoDB
  await client.connect();

  // Lấy reference đến collection "coins" trong database "crypto-tracker"
  const database = client.db('crypto-tracker');
  const coinsCollection = database.collection('coin');

  // Xóa tất cả dữ liệu cũ trong collection 'coin' trước khi thêm mới
  await coinsCollection.deleteMany({});

  // Lưu dữ liệu mới vào MongoDB (sử dụng insertOne để thêm một coin)
  await coinsCollection.insertOne(coinData);
  console.log(`Successfully inserted the coin into the database.`);

  // Đảm bảo đóng kết nối MongoDB
  await client.close();

  return coinData;  // Trả về coin mới lấy được
}
