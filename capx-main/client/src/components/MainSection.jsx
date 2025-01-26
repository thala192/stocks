import React from "react";
import TradingGraph from "./TradingGraph";
import TopTradingCard from "./TopTradingCard";

const MainSection = () => {
  return (
    <div className="-z-10 relative">
      <h1 className="text-3xl font-semibold mb-4 text-gray-100">
        Welcome to the Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-2">
          <TradingGraph />
        </div>
        <div className="p-2">
          <TopTradingCard />
        </div>
        <div className="p-2">
          <TradingGraph />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
