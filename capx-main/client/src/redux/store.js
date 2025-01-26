import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/StockSlice";
import stockDataReducer from "./slices/StockDataSlice";
import dailyStocksDataReducer from "./slices/dailyStockSlice";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    stocksData: stockDataReducer,
    dailyStocks: dailyStocksDataReducer,
  },
});

export default store;
