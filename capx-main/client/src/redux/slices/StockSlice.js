import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "../../constants";

const getStocks = createAsyncThunk("stocks/getStocks", async () => {
  const res = await axios.get(`${BASE_API_URL}/stocks`);
  return Array.isArray(res.data.data) ? res.data.data : [];
});

const addStock = createAsyncThunk("stocks/addStock", async (stock) => {
  const res = await axios.post(`${BASE_API_URL}/stocks`, stock);
  return res.data;
});

const updateStock = createAsyncThunk("stocks/updateStock", async (stock) => {
  const res = await axios.put(`${BASE_API_URL}/stocks/${stock.id}`, stock);
  return res.data;
});

const deleteStock = createAsyncThunk("stocks/deleteStock", async (id) => {
  await axios.delete(`${BASE_API_URL}/stocks/${id}`);
  return id;
});

const getStockSummary = createAsyncThunk("stocks/getStockSummary", async () => {
  const res = await axios.get(`${BASE_API_URL}/stocks/summary`);
  return res.data.data;
});

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    stockSummary: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks.push(action.payload);
      })
      .addCase(addStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stocks.findIndex(
          (stock) => stock.id === action.payload.id
        );
        if (index >= 0) {
          state.stocks[index] = action.payload;
        }
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = state.stocks.filter(
          (stock) => stock.id !== action.payload
        );
      })
      .addCase(deleteStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStockSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.stockSummary = action.payload;
      })
      .addCase(getStockSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { getStocks, addStock, updateStock, deleteStock, getStockSummary };

export default stockSlice.reducer;
