import Binance from 'binance-api-node';

const client = Binance.default();

export const getStatsBinance = async (coin) => {
  try {
    const ticker24hr = await client.dailyStats({ symbol: `${coin}USDT` });
    return { stats: ticker24hr };
  } catch (error) {
    console.error('Error fetching Binance data:', error);
    return null;
  }
};
