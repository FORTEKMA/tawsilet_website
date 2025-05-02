import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// getreviewbyDriver                    $$=> Dash
// getreviewbyClient                    $$=> Dash
// checkcommandReviewExisting       *****
// getreviewByCommandId             *****
// createReview                     *****       then -> update driver rating
// updateExistingReview             *****       then -> update driver rating
// pagination[pageSize]=99999

const token = localStorage.getItem("token");

export const getRviewByCommandId = createAsyncThunk(
  "review/command/get",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_URL}/api/reviews?filters[command][id][$eq]=${id}`,
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

export const createReview = createAsyncThunk(
  "review/create",
  async ({ body }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/reviews`,
        body,
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

export const updateReview = createAsyncThunk(
  "review/update",
  async ({ id, body }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_DOMAIN_URL}/api/reviews/${id}`,
        body,
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
  currentReview: [],
  status: null,
  error: null,
  isLoading: false,
  updatedReservation: null,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    [getRviewByCommandId.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getRviewByCommandId.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.currentReview = action.payload;
    },
    [getRviewByCommandId.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
    [createReview.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [createReview.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      window.location.href = "/ClientProfile/history";
      // state.currentReview = action.payload;
    },
    [createReview.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
    [updateReview.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [updateReview.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.updatedReservation = action.payload;
    },
    [updateReview.failed]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
  },
});

export default reviewSlice.reducer;
