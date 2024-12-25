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
        container_id: containerRef.current.id,
        autosize: true,
        symbol: symbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        studies: [], 
      });
    };

 
    containerRef.current.appendChild(script);


    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      const existingScript = document.getElementById("tradingview-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [symbol]);

  return <div id="tradingview_widget" ref={containerRef} style={{ height: "500px" }} />;
};

export default TradingViewChart;
