import axios from "axios";

export const get100Coins = () => {
    const myCoins = axios
        .get("http://localhost:5000/api/coins")  // Gọi API backend
        .then((response) => {
            console.log("RESPONSE>>>", response.data.coin);
            return response.data.coin;
        })
        .catch((error) => {
            console.log("ERROR>>>", error);
        });

    return myCoins;
};
