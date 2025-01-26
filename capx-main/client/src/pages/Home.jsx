import React, { useEffect } from "react";
import ChartCard from "../components/ChatCard";
import Card from "../components/Card";
import StockData from "../components/Stock/StockData";
import DailyStockGraph from "../components/Stock/DailyStockGraph";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "../redux/slices/StockSlice";
import { ClipLoader } from "react-spinners";
import { MdOutlineAutoGraph } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(getStocks())
  }, [dispatch]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get 4 random stocks from the shuffled array
  const randomStocks = loading ? [] : shuffleArray(stocks).slice(0, 4);

  const pieChartOptions = {
    labels: ["BTC", "USD", "BNB", "ETN", "Others"],
    colors: ["#f39c12", "#1abc9c", "#3498db", "#9b59b6", "#95a5a6"],
    legend: { position: "bottom" },
  };

  const pieChartSeries = [3.33, 9.98, 31.9, 0, 10.89];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Cards */}
      <div className="w-52 bg-gray-700 rounded-lg shadow-lg mb-5">
        <div className="flex items-center justify-center">
          <MdOutlineAutoGraph size={34} className="text-yellow-600" />
          <h1 className="text-white text-2xl text-center p-4 font-bold">
            Top Stocks
          </h1>
        </div>
      </div>
      <div className="w-fullgrid grid-cols-2 gap-4 md:col-span-2 lg:col-span-4">
        <div className="ml-5 flex justify-between gap-12">
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <ClipLoader color="#ef7b00" size={50} /> {/* Spinner */}
            </div>
          ) : (
            randomStocks?.map((stock, index) => (
              <Card stock={stock} key={index} />
            ))
          )}
        </div>
      </div>

      {/* Stock Data */}
      <div className="w-64 bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg shadow-lg p-4 mt-5">
        <div className="flex items-center justify-center">
          <MdOutlineAutoGraph size={34} className="text-yellow-100" />
          <h1 className="text-white text-2xl text-center pl-2 font-bold">
            Stock Graph
          </h1>
        </div>
      </div>

      <div className="w-full mt-6 md:col-span-2 lg:col-span-4">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ClipLoader color="#ef7b00" size={50} />
          </div>
        ) : (
          <StockData />
        )}
      </div>

      {/* Charts */}
      <div className="md:col-span-2 lg:col-span-2">
        <DailyStockGraph />
      </div>
      <div className="md:col-span-2 lg:col-span-2">
        <ChartCard
          title="Balance Details"
          chartOptions={pieChartOptions}
          chartSeries={pieChartSeries}
          type="donut"
        />
      </div>
    </div>
  );
};

export default Home;
