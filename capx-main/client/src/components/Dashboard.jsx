import React from "react";

const Dashboard = ({ metrics }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Portfolio Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-lg font-bold">${metrics.totalValue}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Top Performing Stock</p>
          <p className="text-lg font-bold">{metrics.topStock}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
