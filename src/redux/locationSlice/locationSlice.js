import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export const getLocationById = createAsyncThunk(
  "location/get",
  async ({ id }) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        // `${process.env.REACT_APP_BASE_URL}/users/${id}?populate[0]=accountOverview&populate[1]=accountOverview.currentCommand&populate[2]=accountOverview.currentCommand.client&populate[3]=accountOverview.profilePicture`,
        `${process.env.REACT_APP_BASE_URL}/commands/${id}?populate[driver_id][populate][location]=true&populate[driver_id][populate][profilePicture]=true&populate[pickUpAddress][populate]=coordonne&populate[dropOfAddress][populate]=coordonne&populate[client]=true&populate[review]=true&populate[items][populate]=item`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
 
const initialState = {
  location: null,
  driver: null,
  command: null,
  status: null,
  error: null,
  isLoading: null,
};

export const locationSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [getLocationById.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getLocationById.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      if (
        ["Processing", "Dispatching", "Arrived"].includes(
          action?.payload?.commandStatus
        )
      ) {
        state.location = action?.payload?.driver_id?.position?.coords;
      }
      state.command = action?.payload?.data;
      state.driver = action?.payload?.driver_id;
    },
    [getLocationById.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
    // [getDriverById.pending]: (state) => {
    //   state.status = "pending";
    //   state.isLoading = true;
    // },
    // [getDriverById.fulfilled]: (state, action) => {
    //   state.status = "success";
    //   state.isLoading = false;
    //   state.driver = action.payload;
    // },
    // [getDriverById.rejected]: (state) => {
    //   state.status = "fail";
    //   state.isLoading = false;
    //   state.error = "fail";
    // },
  },
});

export default locationSlice.reducer;
