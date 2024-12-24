import axios from "axios";
import React, { useEffect, useState } from "react";

function Table({ coin }) {

    const [coinBinance, setCoinBinance] = useState([]);
    const [coinKucoin, setCoinKucoin] = useState([]);
    const [coinKraken, setCoinKraken] = useState([]);
    const [coinOkx, setCoinOkx] = useState([]);
    const [coinGate, setCoinGate] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post('http://localhost:3001/balance', `${coin.symbol}`);
                console.log("RESPONSE>>>", response.data);

                const coinBinance = response.data.dataBinance.stats;
                const coinKucoin = response.data.dataKucoin.data;
                const coinKraken = response.data.dataKraken;
                const coinOkx = response.data.dataOkx.data[0];
                const coinGate = response.data.dataGate;
                setCoinBinance(coinBinance);
                setCoinKucoin(coinKucoin);
                setCoinKraken(coinKraken);
                setCoinOkx(coinOkx);
                setCoinGate(coinGate);
            } catch (error) {
                console.log("ERROR>>>", error.message);
            }
        };

        // Gọi getData khi coin.name thay đổi
        getData();
    }, [coin.symbol]); // Khi coin.name thay đổi, hàm sẽ được gọi lại

    var i = 0;

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
                        <td>{coin?.current_price ? coin.current_price.toFixed(2) + "$" : '--'}</td>
                        <td>{coin?.total_volume ? coin.total_volume.toFixed(2) + "$" : '--'}</td>
                        <td>{coin?.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) + "%" : '--'}</td>
                    </tr>

                    <tr>
                        <td>{"Binance"}</td>
                        <td>{coinBinance?.lastPrice ? parseFloat(coinBinance.lastPrice).toFixed(2) + "$" : '--'}</td>
                        <td>{(coinBinance?.volume && coinBinance?.lastPrice) ? (coinBinance.volume * coinBinance.lastPrice).toFixed(2) + "$" : '--'}</td>
                        <td>{coinBinance?.priceChangePercent ? parseFloat(coinBinance.priceChangePercent).toFixed(2) + "%" : '--'}</td>
                    </tr>

                    <tr>
                        <td>{"Kucoin"}</td>
                        <td>{coinKucoin?.last ? parseFloat(coinKucoin.last).toFixed(2) + "$" : '--'}</td>
                        <td>{coinKucoin?.volValue ? parseFloat(coinKucoin.volValue).toFixed(2) + "$" : '--'}</td>
                        <td>{coinKucoin?.changeRate ? (coinKucoin.changeRate * 100).toFixed(2) + "%" : '--'}</td>
                    </tr>

                    <tr>
                        <td>{"Kraken"}</td>
                        <td>
                            {coinKraken?.c ? parseFloat(coinKraken.c).toFixed(2) + "$" : '--'}
                        </td>
                        <td>
                            {coinKraken?.v && coinKraken?.c ? (parseFloat(coinKraken.v) * parseFloat(coinKraken.c)).toFixed(2) + "$" : '--'}
                        </td>
                        <td>
                            {coinKraken?.c && coinKraken?.o ? (((coinKraken.c - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2) + "%" : '--'}
                        </td>
                    </tr>

                    <tr>
                        <td>{"Okx"}</td>
                        <td>{coinOkx?.last ? parseFloat(coinOkx.last).toFixed(2) + "$" : '--'}</td>
                        <td>{coinOkx?.volCcy24h ? parseFloat(coinOkx.volCcy24h).toFixed(2) + "$" : '--'}</td>
                        <td>{coinOkx?.last && coinOkx?.open24h ? parseFloat(((coinOkx.last - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2) + "%" : '--'}</td>
                    </tr>

                    <tr>
                        <td>{"Gate.io"}</td>
                        <td>{coinGate?.last ? parseFloat(coinGate.last).toFixed(2) + "$" : '--'}</td>
                        <td>{coinGate?.quoteVolume ? parseFloat(coinGate.baseVolume).toFixed(2) + "$" : '--'}</td>
                        <td>{coinGate?.percentChange ? parseFloat(coinGate.percentChange).toFixed(2) + "%" : '--'}</td>
                    </tr>

                </tbody>
            </table>

        </div>
    );
}

export default Table;
