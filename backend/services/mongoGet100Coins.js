import { MongoClient } from 'mongodb';
import axios from 'axios';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export async function getCoinsDataFromAPIAndSave() {
  // Lấy dữ liệu từ API
  const response = await axios.get(apiUrl);
  const coinData = response.data;

  // Kết nối đến MongoDB
  await client.connect();

  // Lấy reference đến collection "coins" trong database "crypto-tracker"
  const database = client.db('crypto-tracker');
  const coinsCollection = database.collection('coins');

  // Xóa tất cả dữ liệu cũ trong collection 'coin' trước khi thêm mới
  await coinsCollection.deleteMany({});

  // Lưu dữ liệu mới vào MongoDB (sử dụng insertOne để thêm một coin)
  const coinsData = await coinsCollection.find({}).toArray();
  const result = await coinsCollection.insertMany(coinsData);
  console.log(`Successfully inserted the coin into the database.`);

  // Đảm bảo đóng kết nối MongoDB
  await client.close();

  return coinData;  // Trả về coin mới lấy được
}
