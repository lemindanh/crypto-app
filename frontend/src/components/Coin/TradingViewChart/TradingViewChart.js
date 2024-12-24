import React, { useEffect, useRef } from "react";

const TradingViewChart = ({ symbol }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.id = "tradingview-script";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      new window.TradingView.widget({
        container_id: containerRef.current.id, // Sử dụng ref để lấy container
        autosize: true,
        symbol: symbol,
        interval: "60", // Khung thời gian: 1 phút, 1 giờ, 1 ngày
        timezone: "Etc/UTC",
        theme: "dark", // Theme: light hoặc dark
        style: "1", // Loại biểu đồ: 1 = candlestick
        locale: "en", // Ngôn ngữ
        toolbar_bg: "#f1f3f6", // Màu nền của thanh công cụ
        hide_side_toolbar: false,
        allow_symbol_change: true, // Cho phép thay đổi đồng coin
        studies: [], // Các chỉ báo (e.g., "MACD@tv-basicstudies")
      });
    };

    // Thêm script vào DOM khi component mount
    containerRef.current.appendChild(script);

    // Cleanup khi component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Dọn dẹp container
      }
      const existingScript = document.getElementById("tradingview-script");
      if (existingScript) {
        existingScript.remove(); // Loại bỏ script khi component unmount
      }
    };
  }, [symbol]); // Reload khi symbol thay đổi

  return <div id="tradingview_widget" ref={containerRef} style={{ height: "500px" }} />;
};

export default TradingViewChart;
