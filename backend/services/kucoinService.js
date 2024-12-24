import axios from 'axios';

export const getStatsKucoin = async (symbol) => {
  try {
    const response = await axios.get(`https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching KuCoin data:', error);
    return null;
  }
};
