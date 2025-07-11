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
      }/api/commands?filters[client]=${id}${commandStatuses}&populate[1]=dropOfAddress&populate[2]=pickUpAddress&sort=createdAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${
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
//         }/api/commands?filters[client]=${id}&populate=*&sort=createdAt:desc&pagination[pageSize]=${pageSize}&pagination[page]=${currentPage}${
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
     
      return response.data;
    } catch (error) {
     console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",error)
      throw error;
    }
  }
);

export const getCommandById = createAsyncThunk(
  "order/getCommandById",
  async ({ id }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
`${process.env.REACT_APP_BASE_URL}/commands/${id}?populate[driver][populate][profilePicture]=true&populate[pickUpAddress][populate]=coordonne&populate[dropOfAddress][populate]=coordonne&populate[client]=true&populate[review]=true&populate[vehicule_id][populate]=vehiculePictureface1`,
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
  orders: [],
  newOrder: null,
  currentCommand: null,
  status: null,
  error: null,
  isLoading: false,
  updatedReservation: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentCommandStatus: (state, action) => {
      if (state.currentCommand) {
        state.currentCommand.commandStatus = action.payload;
      }
    },
  },
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
    [getCommandById.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getCommandById.fulfilled]: (state, action) => {
      state.status = "success";
      state.isLoading = false;
      state.currentCommand = action.payload?.data;
    },
    [getCommandById.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      state.error = "fail";
    },
  },
});

export const { setCurrentCommandStatus } = orderSlice.actions;

export default orderSlice.reducer;
