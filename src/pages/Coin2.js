import React, { useState, useEffect } from "react";
import axios from "axios";

function Coin2() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.post("http://localhost:3001/balance");
            console.log("RESPONSE>>>", response.data);
            const coin = response.data.dataBinance.stats;
            setCoins(coin);  // Lưu vào state
        } catch (error) {
            console.log("ERROR>>>", error.message);
        }
    };

    return (
        <div>
        <h1>Coin Data</h1>
        <pre>{JSON.stringify(coins, null, 2)}</pre>  {/* Hiển thị đối tượng coin */}
        <div>
            {coins.symbol}
        </div>
    </div>
    );
}

export default Coin2;
