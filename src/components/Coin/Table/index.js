import axios from "axios";
import React, { useEffect, useState } from "react";

function Table({ coin }) {

    const [coinBinance, setCoinBinance] = useState([]);
    const [coinKucoin, setCoinKucoin] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                // Gửi tên đồng coin qua body của request POST
                const response = await axios.post('http://localhost:3001/balance', `${coin.symbol}`);
                console.log("RESPONSE>>>", response.data);
    
                // Lấy dữ liệu trả về từ Binance và KuCoin
                const coinBinance = response.data.dataBinance.stats;
                const coinKucoin = response.data.dataKucoin.data;
    
                // Cập nhật state với dữ liệu mới nhận được
                setCoinBinance(coinBinance);
                setCoinKucoin(coinKucoin);
            } catch (error) {
                console.log("ERROR>>>", error.message);
            }
        };
    
        // Gọi getData khi coin.name thay đổi
        getData();
    }, [coin.symbol]); // Khi coin.name thay đổi, hàm sẽ được gọi lại
    
    return (
        <div>
            <h1>Coin Data</h1>
            <table border="1" style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Exchange</th>
                        <th>Price</th>
                        <th>Total volume</th>
                        <th>Price Change (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{"Coingecko"}</td>
                        <td>{coin.current_price.toFixed(2)}$</td>
                        <td>{coin.total_volume.toFixed(2)}$</td>
                        <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td>{"Binance"}</td>
                        <td>{parseFloat(coinBinance.lastPrice).toFixed(2)}$</td>
                        <td>{(coinBinance.volume * coinBinance.lastPrice).toFixed(2)}$</td>
                        <td>{parseFloat(coinBinance.priceChangePercent).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td>{"Kucoin"}</td>
                        <td>{parseFloat(coinKucoin.last).toFixed(2)}$</td>
                        <td>{parseFloat(coinKucoin.volValue).toFixed(2)}$</td>
                        <td>{(coinKucoin.changeRate * 100).toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Table;
