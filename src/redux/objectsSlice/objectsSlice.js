import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  objects: [],
  status: null,
  error: null,
  isLoading: false,
};

export const getAllObjects = createAsyncThunk("objects/get", async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_DOMAIN_URL}/api/objets?populate=*&pagination[pageSize]=999999`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllObjects.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getAllObjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.objects = action?.payload?.data;
    },
    [getAllObjects.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
  },
});

// Action creators are generated for each case reducer function
// export const { } = objectsSlice.actions;

export default objectsSlice.reducer;
