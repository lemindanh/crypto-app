import axios from 'axios';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const apiUrl = 'https://api.coingecko.com/api/v3/coins/';

export async function getCoinDataFromAPIAndSave(id) {
  let coinData;
  try {
    console.log(`Fetching data for coin with ID: ${id} from API...`);
    const response = await axios.get(apiUrl + `${id}`);
    coinData = response.data;

    console.log('Connecting to MongoDB...');
    await client.connect();
    const database = client.db('crypto-tracker');
    const coinsCollection = database.collection('coin');

    console.log(`Removing old data for coin with ID: ${id} from database...`);
    await coinsCollection.deleteOne({ id });

    console.log('Inserting new data into database...');
    await coinsCollection.insertOne(coinData);

    console.log('Successfully updated the coin in the database.');
  } catch (error) {
    console.error('Error fetching data from API:', error.message);

    try {
      console.log('Fetching old data from MongoDB...');
      await client.connect();
      const database = client.db('crypto-tracker');
      const coinsCollection = database.collection('coin');

      coinData = await coinsCollection.findOne({ id });

      if (!coinData) {
        console.error(`No data found in database for coin with ID: ${id}`);
        throw new Error('No data available.');
      }

      console.log('Successfully fetched old data from MongoDB.');
    } catch (dbError) {
      console.error('Error fetching old data from MongoDB:', dbError.message);
      throw dbError;
    }
  } finally {
    await client.close();
  }

  return coinData;
}
