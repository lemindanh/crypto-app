import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
//import { convertNumber } from "../../../functions/convertNumber";
//import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";

function Table({ coin }) {

    const [coinBinance, setCoinBinance] = useState([]);
    const [coinKucoin, setCoinKucoin] = useState([]);
    const [coinKraken, setCoinKraken] = useState([]);
    const [coinOkx, setCoinOkx] = useState([]);
    const [coinGate, setCoinGate] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                // Gửi tên đồng coin qua body của request POST
                const response = await axios.post('http://localhost:5000/balance', `${coin.symbol}`);
                console.log("RESPONSE>>>", response.data);

                // Lấy dữ liệu trả về từ Binance và KuCoin
                const coinBinance = response.data.dataBinance.stats;
                const coinKucoin = response.data.dataKucoin.data;
                const coinKraken = response.data.dataKraken;
                const coinOkx = response.data.dataOkx.data[0];
                const coinGate = response.data.dataGate;
                // Cập nhật state với dữ liệu mới nhận được
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

    return (
        <div class="grey-wrapper">

            <div className="table-cont">
                <h1 style={{ textAlign: "center" }}>Coin Data</h1>
                <table>
                    <thead  className="table-title">
                        <tr>
                            <th>Coin</th>
                            <th>Exchange</th>
                            <th>Price</th>
                            <th>Total volume</th>
                            <th>Percent Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/coingecko.png`} alt="Coingecko Logo" />
                                    <p>{"Coingecko"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end">
                                <td
                                    className={`current-price ${coin.price_change_percentage_24h < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${coin.current_price.toFixed(2)}
                                </td>
                            </Tooltip>
                            <td>{coin.total_volume.toFixed(2)}$</td>
                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {coin.price_change_percentage_24h >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>
                        </tr>
                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/binance.png`} alt="Binance Logo" />
                                    <p>{"Binance"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end">
                                <td
                                    className={`current-price ${coinBinance.priceChangePercent < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${parseFloat(coinBinance.lastPrice).toFixed(2)}
                                </td>
                            </Tooltip>
                            <td>{(coinBinance.volume * coinBinance.lastPrice).toFixed(2)}$</td>

                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {coinBinance.priceChangePercent >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {parseFloat(coinBinance.priceChangePercent).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {parseFloat(coinBinance.priceChangePercent).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>
                        </tr>
                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/kucoin.png`} alt="Kucoin Logo" />
                                    <p>{"Kucoin"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end">
                                <td
                                    className={`current-price ${(coinKucoin.changeRate * 100) < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${parseFloat(coinKucoin.last).toFixed(2)}
                                </td>
                            </Tooltip>

                            <td>{parseFloat(coinKucoin.volValue).toFixed(2)}$</td>
                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {(coinKucoin.changeRate * 100) >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {(coinKucoin.changeRate * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {(coinKucoin.changeRate * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>
                        </tr>
                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/kraken.png`} alt="Coingecko Logo" />
                                    <p>{"Kraken"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end">
                                <td
                                    className={`current-price ${(((coinKraken.c - coinOkx.open24h) / coinOkx.open24h) * 100) < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${parseFloat(coinKraken.c).toFixed(2)}
                                </td>
                            </Tooltip>
                            <td>
                                {coinKraken?.v && coinKraken?.c ? (parseFloat(coinKraken.v) * parseFloat(coinKraken.c)).toFixed(2) + "$" : '--'}
                            </td>
                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {(((coinKraken.c - coinOkx.open24h) / coinOkx.open24h) * 100) >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {(((coinKraken.c - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {(((coinKraken.c - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>
                        </tr>

                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/okx.png`} alt="OKX Logo" />
                                    <p>{"OKX"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end">
                                <td
                                    className={`current-price ${parseFloat(((coinOkx.last - coinOkx.open24h) / coinOkx.open24h) * 100) < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${parseFloat(coinOkx.last).toFixed(2)}
                                </td>
                            </Tooltip>
                            <td>{coinOkx?.volCcy24h ? parseFloat(coinOkx.volCcy24h).toFixed(2) + "$" : '--'}</td>
                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {(((coinOkx.last - coinOkx.open24h) / coinOkx.open24h) * 100) >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {parseFloat(((coinOkx.last - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {parseFloat(((coinOkx.last - coinOkx.open24h) / coinOkx.open24h) * 100).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>

                        </tr>

                        <tr>
                            <Tooltip title="Coin Info" placement="bottom-start">
                                <td className="td-info">
                                    <div className="info-flex">
                                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                                        <p className="coin-name">{coin.name}</p>
                                    </div>
                                </td>
                            </Tooltip>
                            <Tooltip className="marketcap" title="Coinmaket" placement="bottom-start">
                                <td>
                                    <img className="img-marketcap" src={`${process.env.PUBLIC_URL}/gate.png`} alt="Gate.io Logo" />
                                    <p>{"Gate.io"}</p>
                                </td>
                            </Tooltip>
                            <Tooltip title="Current Price (USD)" placement="bottom-end" >
                                <td
                                    className={`current-price ${parseFloat(coinGate.percentChange) < 0 ? "current-price-red" : ""
                                        }`}
                                >
                                    ${parseFloat(coinGate.last).toFixed(2)}
                                </td>
                            </Tooltip>
                            <td>{coinGate?.quoteVolume ? parseFloat(coinGate.baseVolume).toFixed(2) + "$" : '--'}</td>
                            <Tooltip
                                title="Coin Price Percentage In 24hrs"
                                placement="bottom-start"
                            >
                                {parseFloat(coinGate.percentChange) >= 0 ? (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip">
                                                {parseFloat(coinGate.percentChange).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon">
                                                <TrendingUpRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                ) : (
                                    <td>
                                        <div className="chip-flex1">
                                            <div className="price-chip red">
                                                {parseFloat(coinGate.percentChange).toFixed(2)}%
                                            </div>
                                            <div className="chip-icon td-chip-icon red">
                                                <TrendingDownRoundedIcon />
                                            </div>
                                        </div>
                                    </td>
                                )}
                            </Tooltip>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
