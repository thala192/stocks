import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const Card = ({ stock }) => {
  const mockCurrentPrice = stock.buyPrice * 1.05;
  
  const priceChange = ((mockCurrentPrice - stock.buyPrice) / stock.buyPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="relative w-72 group">
      {/* Animated background gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* Glass effect container */}
      <div className="relative h-full bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-lg p-6 ring-1 ring-gray-700/50 cursor-pointer">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors duration-200">{stock.name}</h3>
          <div className="bg-gray-800 bg-opacity-80 px-2 py-1 rounded text-sm text-gray-300 ring-1 ring-gray-700">
            {stock.ticker}
          </div>
        </div>

        {/* Price Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center group/price">
            <span className="text-gray-400 group-hover/price:text-gray-300 transition-colors duration-200">Current Price</span>
            <span className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-200">
              ₹{mockCurrentPrice.toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Buy Price</span>
            <span className="text-lg text-white">₹{stock.buyPrice.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-700/50 my-2"></div>

          {/* Quantity and Change */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-400">Quantity</span>
              <p className="text-lg font-medium text-white">{stock.quantity}</p>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'} transition-all duration-200`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              <span className="text-lg font-semibold">
                {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Total Value */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 mt-4 ring-1 ring-gray-700/50 group-hover:ring-blue-500/20 transition-all duration-300">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Value</span>
              <span className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-200">
                ₹{(mockCurrentPrice * stock.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;