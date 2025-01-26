import React from "react";

const TopTradingCard = () => {
  return (
    <div className="w-full bg-gray-700 text-white rounded-lg shadow-lg p-4 max-w-xs">
      <h3 className="text-3xl font-bold mb-4 text-center text-green-500">Top Trading</h3>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span>Stock Name:</span>
          <span className="font-semibold">Tesla</span>
        </div>
        <div className="flex justify-between">
          <span>Volume:</span>
          <span className="font-semibold">15,000</span>
        </div>
        <div className="flex justify-between">
          <span>Price:</span>
          <span className="font-semibold">$ 950</span>
        </div>
        <div className="flex justify-between">
          <span>Change:</span>
          <span className="font-semibold text-green-500">+3.5%</span>
        </div>
      </div>
    </div>
  );
};

export default TopTradingCard;
