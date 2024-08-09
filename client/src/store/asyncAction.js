import { createAsyncThunk } from "@reduxjs/toolkit";
import * as APIs from "../api";
export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await APIs.Categories();

    if (!response.success) return rejectWithValue(response);
    return response.productCategories;
  }
);
