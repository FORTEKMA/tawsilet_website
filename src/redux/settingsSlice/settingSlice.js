import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  settings: [],
  status: null,
  error: null,
  isLoading: false,
};

export const getAllSettings = createAsyncThunk("settings/get", async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DOMAIN_URL}/api/parameters?populate=*`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllSettings.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getAllSettings.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.settings = action?.payload?.data;
    },
    [getAllSettings.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
  },
});

// Action creators are generated for each case reducer function
// export const { } = objectsSlice.actions;

export default settingSlice.reducer;
