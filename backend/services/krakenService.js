import axios from 'axios';

function arrayKraken(data) {
  const result = Object.values(data['result'])[0];
  const first_elements = {};
  
  for (const [key, values] of Object.entries(result)) {
    if (key === 'o') {
      first_elements[key] = values;
      continue;
    }
    first_elements[key] = values[0];
  }
  return first_elements;
}

export async function getStatsKraken(symbol) {
  try {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${symbol}`);
    return arrayKraken(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
