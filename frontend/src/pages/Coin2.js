import React, { useState, useEffect } from "react";
import axios from "axios";

function Coin2() {
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        // Get 100 Coins
        getData();
    }, []);

    const getData = () => {
        axios
        .get(
            `http://localhost:5000/api/prices/bitcoin/7`
          )
          .then((response) => {
              console.log("Prices>>>", response.data);
            }
          )
          .catch((e) => {
            console.log(e.message);

          });
    };

    return (
        <div>
            <h1>Coin Data</h1>
            {/* <pre>{JSON.stringify(coins, null, 2)}</pre>
        <div>
            {coins.symbol}
        </div> */}
        </div>
    );
}

export default Coin2;
