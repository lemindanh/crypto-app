import Binance from 'binance-api-node';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

var app = express();

app.listen(3001);

app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));

const client = Binance.default({});

async function getStatsBinance(coin) {
  try {
    const ticker24hr = await client.dailyStats({ symbol: `${coin}USDT` });

    return {
      stats: ticker24hr
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return null;
  }
}

async function getStatsKucoin(symbol) {
  try {
    const response = await axios.get(`https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getStatsOkx(symbol) {
  try {
    const response = await axios.get(`https://www.okx.com/api/v5/market/ticker?instId=${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function getStatsGate(symbol) {
  try {
    const response = await axios.get(`https://api.gateio.ws/api2/1/ticker/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Hàm trích xuất phần tử đầu tiên của mỗi mảng trong kết quả
function arrayKraken(data) {
  // Lấy phần tử duy nhất trong mảng 'result' (sử dụng Object.values() để lấy giá trị)
  const result = Object.values(data['result'])[0];  // Lấy phần tử đầu tiên của mảng 'result'

  // Dùng map để tạo đối tượng mới với phần tử đầu tiên của mỗi mảng
  const first_elements = {};
  
  for (const [key, values] of Object.entries(result)) {
    if (key === 'o') {
      // Xử lý đặc biệt cho key 'o', giữ nguyên giá trị
      first_elements[key] = values;
      continue;  // Tiếp tục với phần tử tiếp theo trong vòng lặp
    }
    // Lấy phần tử đầu tiên của mảng cho các key khác
    first_elements[key] = values[0];
  }
  

  return first_elements;
}



async function getStatsKraken(symbol) {
  try {
    const response = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${symbol}`);
    console.log(response.data);
    return arrayKraken(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

app.use(function (rep, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
})

// Route để lấy giá khi có yêu cầu POST
app.post("/balance", async function (req, res) {
  const receivedObject = req.body;

  const keys = Object.keys(receivedObject);
  const coin = keys[0].toUpperCase();

  console.log(`Fetching data for: ${coin}`);
  const dataBinance = await getStatsBinance(coin);
  const dataKucoin = await getStatsKucoin(`${coin}-USDT`);
  const dataKraken = await getStatsKraken(`${coin}USD`);
  const dataOkx = await getStatsOkx(`${coin}-USDT`);
  const dataGate = await getStatsGate(`${coin}_USDT`);
  console.log(dataKraken);

  if (dataBinance) {
    res.json({
      success: true,
      dataBinance: dataBinance,
      dataKucoin: dataKucoin,
      dataKraken: dataKraken,
      dataOkx: dataOkx,
      dataGate: dataGate
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy dữ liệu.',
    });
  }
});

console.log("Server is running on port 3001");
