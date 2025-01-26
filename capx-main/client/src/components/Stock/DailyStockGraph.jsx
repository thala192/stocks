import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import Chart from "react-apexcharts";
import { getDailyStockData } from "../../redux/slices/dailyStockSlice";
import { MdOutlineContentPasteSearch } from "react-icons/md";

const DailyStockGraph = () => {
  const dispatch = useDispatch();
  const { dailyStocks, loading, error } = useSelector((state) => state.dailyStocks);
  const [formData, setFormData] = useState({
    from: "BTC",
    to: "USD",
    date: "2023-01-09",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(getDailyStockData(formData));
  };

  const options = {
    chart: {
      type: "bar",
      zoom: { enabled: false },
    },
    title: {
      text: `${formData.from}/${formData.to}: Daily Open and Close`,
      align: "center",
      style: { fontSize: "18px", color: "#fff" },
    },
    xaxis: {
      categories: ["Open", "Close"],
      labels: { style: { color: "#fff" } },
    },
    yaxis: {
      title: { text: "Price (USD)", style: { color: "#fff" } },
      labels: { style: { color: "#fff" } },
    },
    theme: { mode: "dark" },
    grid: { show: true, borderColor: "#444" },
  };

  const series = [
    {
      name: "Price",
      data: [dailyStocks?.open ?? 0, dailyStocks?.close ?? 0],
    },
  ];
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">Know the daily price of a stock</h2>
      <div className="mb-4 flex justify-between items-center gap-4">
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleInputChange}
          placeholder="Enter 'from' symbol (e.g., BTC)"
          className="w-full p-2 rounded-lg text-black mb-2"
        />
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleInputChange}
          placeholder="Enter 'to' symbol (e.g., USD)"
          className="w-full p-2 rounded-lg text-black mb-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Enter date (YYYY-MM-DD)"
          className="w-full p-2 rounded-lg text-black mb-2"
        />
        <button
          onClick={handleSubmit}
          className="w-12 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          <MdOutlineContentPasteSearch size={28}/>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader size={15} color="#1abc9c" />
        </div>
      ) : error ? (
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
        </div>
      ) : dailyStocks ? (
        <div className="p-4 bg-gray-700 rounded shadow">
          <Chart options={options} series={series} type="bar" height={350} />
        </div>
      ) : (
        <p className="text-center text-white">No data available.</p>
      )}
    </div>
  );
};

export default DailyStockGraph;
