import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';


export async function getCoinsData() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coins');

    console.log('Fetching data from database...');
    const coinData = await coinsCollection.find({}).toArray();
    console.log('Data successfully fetched.');
    return coinData;
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return [];
  } finally {
    await client.close();
  }
}
