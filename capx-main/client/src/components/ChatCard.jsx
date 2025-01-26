import React from "react";
import Chart from "react-apexcharts";

const ChartCard = ({ title, chartOptions, chartSeries, type = "line" }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <Chart options={chartOptions} series={chartSeries} type={type} height={200} />
    </div>
  );
};

export default ChartCard;
