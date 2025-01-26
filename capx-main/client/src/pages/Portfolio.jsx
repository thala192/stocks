import { useState, useEffect } from "react";
import StockForm from "../components/StockForm";
import StockList from "../components/StockList";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStock } from "react-icons/ai";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BeatLoader, RingLoader } from "react-spinners";

import {
  deleteStock,
  getStocks,
  updateStock,
  addStock,
  getStockSummary,
} from "../redux/slices/StockSlice";

const Portfolio = () => {
  const stocks = useSelector((state) => state.stocks.stocks);
  const stockSummary = useSelector((state) => state.stocks.stockSummary);
  const loading = useSelector((state) => state.stocks.loading); 
  const dispatch = useDispatch();
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    dispatch(getStocks());
    dispatch(getStockSummary());
  }, [dispatch]);

  const handleEdit = (stock) => {
    setEditingStock(stock);
  };

  const handleDelete = (id) => {
    dispatch(deleteStock(id));
  };

  const handleAddStock = (stock) => {
    dispatch(addStock(stock));
    setEditingStock(null);
  };

  const handleUpdateStock = (stock) => {
    dispatch(updateStock(stock));
    setEditingStock(null);
  };

  const formatPercentage = (value) => {
    if (!value) return "0%";
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Portfolio Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-5 w-[500px]">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <StockForm
                addStock={handleAddStock}
                updateStock={handleUpdateStock}
                initialStock={editingStock}
              />
            </div>
          </div>

          {/* Stats Cards Section */}
          <div className="ml-32 lg:col-span-7 space-y-6">
            {/* Total Volume Card */}
            <div className="w-[250px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl text-green-400 font-semibold mb-4 flex items-center gap-2">
                <AiOutlineStock className="text-green-500" />
                Total Volume
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AiOutlineStock size={40} className="text-green-600" />
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
                    {stockSummary && stockSummary.totalVolume !== undefined ? (
                      stockSummary.totalVolume
                    ) : (
                      <BeatLoader size={12} color="#4ade80" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Balance Card */}
            <div className="w-[400px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl text-blue-400 font-semibold mb-4 flex items-center gap-2">
                <MdAccountBalanceWallet className="text-blue-500" />
                Total Balance
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MdAccountBalanceWallet size={40} className="text-blue-600" />
                  <div>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
                      {stockSummary && stockSummary.totalBalance !== undefined ? (
                        stockSummary.totalBalance
                      ) : (
                        <BeatLoader size={12} color="#60a5fa" />
                      )}
                    </div>
                    <div className="text-lg text-gray-400 mt-2">
                      Gain/Loss:{" "}
                      <span
                        className={`font-semibold ${
                          stockSummary?.averageGainLoss >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {stockSummary && stockSummary.averageGainLoss !== undefined ? (
                          formatPercentage(stockSummary.averageGainLoss)
                        ) : (
                          <BeatLoader size={8} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stock List Section */}
        <div className="mt-8">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Your Stocks</h2>
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <RingLoader size={60} color="#4ade80" />
              </div>
            ) : (
              <StockList stocks={stocks} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;