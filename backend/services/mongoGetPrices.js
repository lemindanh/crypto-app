import { MongoClient } from 'mongodb';
import axios from 'axios';

const uri = 'mongodb+srv://danhtichtay123:123@crypto-tracker.jfvu0.mongodb.net/crypto-tracker?retryWrites=true&w=majority';

const client = new MongoClient(uri);

export const getCoinPricesAndSave = async (req, res) => {
  const { id, days } = req.params; 
  try {
    console.log(`Fetching data for coin ${id} for the past ${days} days...`);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    const coinData = response.data;

    console.log('Connecting to MongoDB...');
    await client.connect();
    const database = client.db('crypto-tracker');
    const pricesCollection = database.collection('prices');

    console.log(`Removing old data for coin ${id}...`);
    await pricesCollection.deleteOne({ id });

    console.log('Inserting new data into database...');
    await pricesCollection.insertOne({
      id,
      prices: coinData.prices,
      total_volumes: coinData.total_volumes,
      market_caps: coinData.market_caps,
      timestamp: new Date().toISOString(),
    });

    console.log('Successfully updated the coin data in the database.');

    res.json({
      prices: coinData.prices,
      total_volumes: coinData.total_volumes,
      market_caps: coinData.market_caps,
    });
  } catch (error) {
    console.error('Error retrieving data from API:', error.message);

    try {
      console.log('Fetching old data from MongoDB...');
      await client.connect();
      const database = client.db('crypto-tracker');
      const pricesCollection = database.collection('prices');

      const oldData = await pricesCollection.findOne({ id });

      if (oldData) {
        console.log('Successfully retrieved old data from database.');
        res.json({
          prices: oldData.prices,
          total_volumes: oldData.total_volumes,
          market_caps: oldData.market_caps,
        });
      } else {
        console.error(`No old data found for coin ${id}.`);
        res.status(404).json({ error: 'No data available for the requested coin.' });
      }
    } catch (dbError) {
      console.error('Error retrieving old data from MongoDB:', dbError.message);
      res.status(500).json({ error: 'Error retrieving old data from database.' });
    }
  } finally {

    await client.close();
  }
};
