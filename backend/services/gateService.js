import axios from 'axios';

export async function getStatsGate(symbol) {
  try {
    const response = await axios.get(`https://api.gateio.ws/api2/1/ticker/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
