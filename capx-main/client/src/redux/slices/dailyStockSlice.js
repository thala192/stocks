import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../constants";

export const getDailyStockData = createAsyncThunk(
  "dailyStocks/getDailyStocksData",
  async ({ from, to, date }) => {
    const res = await axios.get(
      `${BASE_API_URL}/crypto/daily-stock-price?from=${from}&to=${to}&date=${date}`
    );
    return res.data.data;
  }
);

const dailyStockDataSlice = createSlice({
  name: "dailyStocks",
  initialState: {
    dailyStocks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDailyStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDailyStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyStocks = action.payload;
      })
      .addCase(getDailyStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dailyStockDataSlice.reducer;