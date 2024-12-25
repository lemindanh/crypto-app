import { MongoClient } from 'mongodb';
import axios from 'axios';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

export async function initializeCoinsData() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coins');

    console.log('Fetching data from API...');
    const response = await axios.get(apiUrl);
    const coinData = response.data;

    console.log('Updating database with new data...');
    await coinsCollection.deleteMany({});
    await coinsCollection.insertMany(coinData);

    console.log('Successfully updated coin data.');
  } catch (error) {
    console.error('Error during initialization:', error);
  } finally {
    await client.close();
  }
}