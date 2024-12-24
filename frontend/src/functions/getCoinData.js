import axios from "axios";

export const getCoinData = (id, setError) => {
  const coin = axios
    .get(`http://localhost:5000/api/coin/${id}`)
    .then((response) => {
      if (response.data.coin) {
        return response.data.coin;
      }
    })
    .catch((e) => {
      console.log(e.message);
      if (setError) {
        setError(true);
      }
    });
  return coin;
};
