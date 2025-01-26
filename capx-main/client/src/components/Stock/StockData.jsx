import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockGraph from "./StockGraph";
import { BeatLoader } from "react-spinners";
import { getStockData } from "../../redux/slices/StockDataSlice";

const StockData = () => {
  const [symbol, setSymbol] = useState("IBM");
  const dispatch = useDispatch();
  const { stocksData, loading, error } = useSelector((state) => state.stocksData);

  useEffect(() => {
    dispatch(getStockData(symbol));
  }, [dispatch, symbol]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Stock Symbol"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <button
          onClick={() => dispatch(getStockData(symbol))}
          className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Fetch Stock Data
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader size={15} color="#1abc9c" />
        </div>
      ) : error ? (
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      ) : stocksData ? (
        <StockGraph stockData={stocksData} />
      ) : (
        <p className="text-center text-white">No stock data available.</p>
      )}
    </div>
  );
};

export default StockData;