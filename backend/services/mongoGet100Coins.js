import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function getCoinsData() {
  try {
    // Kết nối đến MongoDB
    await client.connect();

    // Lấy reference đến collection "coins" trong database "crypto-tracker"
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coins');

    // Lấy tất cả coin từ MongoDB
    const coins = await coinsCollection.find({}).toArray();
    return coins;
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    throw error; // Ném lỗi để các controller có thể xử lý
  } finally {
    // Đảm bảo đóng kết nối
    await client.close();
  }
}

export async function insertCoinsData(coinsData) {
  try {
    // Kết nối đến MongoDB
    await client.connect();

    // Lấy reference đến collection "coins" trong database "crypto-tracker"
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coins');

    // Xóa tất cả dữ liệu cũ trong collection 'coins' trước khi thêm mới
    await coinsCollection.deleteMany({});

    // Lưu dữ liệu mới vào MongoDB
    const result = await coinsCollection.insertMany(coinsData);
    console.log(`Successfully inserted ${result.insertedCount} coins into the database.`);
    return result;
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    throw error; // Ném lỗi để các controller có thể xử lý
  } finally {
    // Đảm bảo đóng kết nối
    await client.close();
  }
}
