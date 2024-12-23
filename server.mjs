import Binance from 'binance-api-node';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

var app = express();

app.listen(3001);

app.use(bodyParser.raw({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: false }));

const client = Binance.default({});

// Hàm lấy giá theo tên coin
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
    // Gửi yêu cầu HTTP tới API của KuCoin
    const response = await axios.get(`https://api.kucoin.com/api/v1/market/stats?symbol=${symbol}`);

    // Log dữ liệu trả về từ API
    console.log(response.data);  // Đảm bảo bạn đang truy xuất đúng dữ liệu từ response

    // Trả về dữ liệu trả về từ API
    return response.data;  // Trả về dữ liệu từ API, không phải đối tượng {response}
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;  // Trả về null nếu có lỗi
  }
}

app.use(function (rep, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
})

// Route để lấy giá khi có yêu cầu POST
app.post("/balance", async  function(req, res){
  console.log('Dữ liệu nhận được:', req.body); 

  const receivedObject = req.body; // Ví dụ: { bnb: "some_value" }
  
  // Lấy tên của thuộc tính đầu tiên (nếu đối tượng có nhiều thuộc tính, bạn có thể điều chỉnh để lấy tất cả)
  const keys = Object.keys(receivedObject);
  const firstKey = keys[0];
  const uppercaseKey = firstKey.toUpperCase();
  //var symbol = req.body.symbol;  // Chuyển chuỗi raw thành string
  console.log(`Fetching data for: ${uppercaseKey}`);
  const dataBinance = await getStatsBinance(uppercaseKey);
  const dataKucoin = await getStatsKucoin(`${uppercaseKey}-USDT`);

  if (dataBinance) {
    res.json({
      success: true,
      dataBinance: dataBinance,
      dataKucoin: dataKucoin
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'Không thể lấy dữ liệu.',
    });
  }
});

console.log("Server is running on port 3001");
