import axios from 'axios';

export async function getStatsOkx(symbol) {
  try {
    const response = await axios.get(`https://www.okx.com/api/v5/market/ticker?instId=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
