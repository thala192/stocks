import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../constants";

export const getStockData = createAsyncThunk(
  "stocksData/getStocksData",
  async (symbol) => {
    const res = await axios.get(
      `${BASE_API_URL}/stocks/data?symbol=${symbol}&interval=5min`
    );
    return res.data.data;
  }
);

const stockSliceData = createSlice({
  name: "stocksData",
  initialState: {
    stocksData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stocksData = action.payload;
      })
      .addCase(getStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSliceData.reducer;
