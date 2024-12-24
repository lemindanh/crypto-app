import React, { useState } from "react";
import TradingViewChart from "../TradingViewChart/TradingViewChart";
import "./ButtonTradingView.css";

const ButtonTradingView = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = (event) => {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
    setIsPopupVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup} className="tradingview-button">
        Trading View
      </button>

      {isPopupVisible && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Ngăn đóng popup khi nhấn vào nội dung
          >
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
            {/* Chỉ render TradingViewChart khi popup hiển thị */}
            {isPopupVisible && <TradingViewChart symbol="BTCUSDT" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonTradingView;
