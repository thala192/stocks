import React from "react";
import Chart from "react-apexcharts";

const StockGraph = ({ stockData }) => {
  if (!stockData || !stockData["Time Series (5min)"]) {
    return <div>No data available for this symbol.</div>;
  }

  const timestamps = Object.keys(stockData["Time Series (5min)"]).reverse();
  const closePrices = timestamps.map(
    (time) => stockData["Time Series (5min)"][time]["4. close"]
  );

  const options = {
    chart: {
      type: "line",
      zoom: { enabled: false },
    },
    title: {
      text: `Stock Prices for ${stockData["Meta Data"]["2. Symbol"]}`,
      align: "center",
      style: { fontSize: "18px", color: "#fff" },
    },
    xaxis: {
      categories: timestamps,
      title: { text: "Time", style: { color: "#fff" } },
      labels: { rotate: -45 },
    },
    yaxis: {
      title: { text: "Closing Price", style: { color: "#fff" } },
      labels: { style: { color: "#fff" } },
    },
    theme: { mode: "dark" },
    grid: { show: true, borderColor: "#444" },
  };

  const series = [
    {
      name: "Closing Price",
      data: closePrices,
    },
  ];

  return (
    <div className="p-6 bg-gray-700 rounded shadow">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default StockGraph;
