import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getNotification = createAsyncThunk(
//   "notification/get",
//   async ({ id }) => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}notifications?sort=id:desc&filters[sendTo][$contains]=${id}&&populate=*`
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const isReadNotification = createAsyncThunk(
//   "notification/read",
//   async (id) => {
//     try {
//       const response = await axios.put(
//         `${process.env.REACT_APP_BASE_URL}notifications/${id}`,
//         {
//           data: {
//             isRead: true,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const sendNotification = createAsyncThunk(
  "notification/send",
  async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}notify-user`,
        body
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  notifications: [],
  status: "",
  error: null,
};

export const notificationSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // [getNotification.pending]: (state) => {
    //   state.status = "pending";
    // },
    // [getNotification.fulfilled]: (state, action) => {
    //   state.status = "success";
    //   state.notifications = action.payload;
    // },
    // [getNotification.rejected]: (state) => {
    //   state.status = "fail";
    //   state.error = "fail";
    // },
    // [isReadNotification.pending]: (state) => {
    //   state.status = "pending";
    // },
    // [isReadNotification.fulfilled]: (state, action) => {
    //   state.status = "success";
    // },
    // [isReadNotification.rejected]: (state) => {
    //   state.status = "fail";
    //   state.error = "fail";
    // },
    [sendNotification.pending]: (state) => {
      state.status = "pending";
    },
    [sendNotification.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [sendNotification.rejected]: (state) => {
      state.status = "fail";
      state.error = "fail";
    },
  },
});
export default notificationSlice.reducer;
