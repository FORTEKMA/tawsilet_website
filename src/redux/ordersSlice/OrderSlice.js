import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const getOrderById = createAsyncThunk(
  "order/get",
  async ({
    id,
    currentPage = 1,
    pageSize = 10,
    text = "",
    status = [
      "Pending",
      "Dispatched_to_partner",
      "Assigned_to_driver",
      "Driver_on_route_to_pickup",
      "Arrived_at_pickup",
      "Picked_up",
      "On_route_to_delivery",
      "Arrived_at_delivery",
      "Failed_pickup",
      "Failed_delivery",
      "Delivered",
      "Completed",
      "Canceled_by_partner",
      "Canceled_by_client",
    ],
  }) => {
    // Construct status filters similar to the mobile API
    const commandStatuses = status.length
      ? "&" +
        status
          .map((el, i) => `filters[commandStatus][$in][${i}]=${el}`)
          .join("&")
      : "";

    try {
      const token = localStorage.getItem("token");
      const url = `${
        process.env.REACT_APP_DOMAIN_URL
      }/api/commands?filters[client_id]=${id}${commandStatuses}&populate[0]=items&populate[1]=items.item&populate[2]=dropOfAddress&populate[3]=pickUpAddress&sort=createdAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${
        text !== ""
          ? // Use $containsi for case-insensitive search on refNumber (matches mobile behavior)
            `&filters[$or][0][pickUpAddress][Address][$contains]=${text}&filters[$or][1][dropOfAddress][Address][$contains]=${text}&filters[$or][2][id][$eq]=${text}&filters[$or][3][refNumber][$containsi]=${text}&filters[$or][4][commandStatus][$contains]=${text}&filters[$or][5][departDate][$contains]=${text}`
          : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// export const getOrderById = createAsyncThunk(
//   "order/get",
//   async ({ id, currentPage = 1, pageSize = 10, text = "" }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `${
//           process.env.REACT_APP_DOMAIN_URL
//         }/api/commands?filters[client_id]=${id}&populate=*&sort=createdAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${
//           text !== ""
//             ? `&filters[$or][0][pickUpAddress][Address][$contains]=${text}&filters[$or][1][dropOfAddress][Address][$contains]=${text}&filters[$or][2][id][$eq]=${text}&filters[$or][3][refNumber][$contains]=${text}&filters[$or][4][commandStatus][$contains]=${text}&filters[$or][5][departDate][$contains]=${text}`
//             : ""
//         }`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const updateReservation = createAsyncThunk(
  "order/update",
  async ({ id, body }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_DOMAIN_URL}/api/commands/${id}`,
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
export const createNewOrder = createAsyncThunk(
  "order/neworder",
  async (order) => {
    // console.log("ffffffffffffffffffffff,order", order);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/commands`,
        order,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      // if (response.status === 200) {
      //   console.log(response?.data?.data?.attributes);
      //   if (response?.data?.data?.attributes?.payType === "Credit") {
      //     window.location.href(response?.data?.data?.attributes?.paymentUrl);
      //   }
      // }
      return response.data;
    } catch (error) {
      // console.log(
      //   "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      //   error
      // );
      throw error;
    }
  }
);
const initialState = {
  orders: [],
  newOrder: null,
  status: null,
  error: null,
  isLoading: false,
  updatedReservation: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [getOrderById.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.orders = action.payload;
    },
    [getOrderById.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
    [createNewOrder.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [createNewOrder.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.newOrder = action.payload;
      // console.log(action?.payload?.data?.attributes);
      if (action?.payload?.data?.attributes?.payType === "Credit") {
        window.location.href = action?.payload?.data?.attributes?.paymentUrl;
        // setTimeout(() => {
        //   window.location.replace("/ClientProfile/history");
        // }, 600);
      }
    },
    [createNewOrder.failed]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
    [updateReservation.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [updateReservation.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.updatedReservation = action.payload;
    },
    [updateReservation.failed]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
  },
});

export default orderSlice.reducer;
