import React, { useState } from "react";
import Chart from "react-apexcharts";

const TradingGraph = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "candlestick",
      height: 350,
      width: "100%",
      toolbar: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            labels: {
              show: true,
              rotate: -45,
              style: {
                fontSize: "10px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
          yaxis: {
            show: false,
          },
        },
      },
    ],
    title: {
      // text: "Trading Graph",
      align: "left",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#4ade80", // A vibrant green color
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#e5e7eb",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#e5e7eb",
        },
      },
    },
    theme: {
      mode: "dark",
    },
    grid: {
      borderColor: "#374151",
    },
  });

  const [series, setSeries] = useState([
    {
      data: [
        {
          x: new Date("2024-12-14").getTime(),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date("2024-12-15").getTime(),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date("2024-12-16").getTime(),
          y: [6631.41, 6640, 6619.19, 6622.62],
        },
        {
          x: new Date("2024-12-17").getTime(),
          y: [6623.03, 6650.5, 6623.03, 6635.12],
        },
      ],
    },
  ]);

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-700 to-gray-700 text-white p-6 rounded-xl shadow-2xl max-w-screen-lg mx-auto">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-400">
          Trading Graph
        </h1>
      </div>

      {/* Chart Section */}
      <Chart options={chartOptions} series={series} type="candlestick" height="100%" />
    </div>
  );
};

export default TradingGraph;
