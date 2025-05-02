import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const createTicketWithAttachments = createAsyncThunk(
  "tickets/createTicketWithAttachments",
  async ({ title, description, command, user, attachments }) => {
    try {
      const token = localStorage.getItem("token");
      // 1. Create the ticket
      const ticketRes = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/tickets`,
        {
          data: {
            title,
            description,
            command,
            user,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const ticketId = ticketRes.data?.data?.id;

      // 2. Upload files if attachments exist
      if (attachments && attachments.length && ticketId) {
        const formData = new FormData();
        attachments.forEach((file) => {
          formData.append("files", file);
        });

        formData.append("ref", "api::ticket.ticket");
        formData.append("refId", ticketId.toString());
        formData.append("field", "attachment");

        await axios.post(
          `${process.env.REACT_APP_DOMAIN_URL}/api/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      return ticketRes.data;
    } catch (err) {
      return;
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetTicketState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicketWithAttachments.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTicketWithAttachments.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createTicketWithAttachments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetTicketState } = ticketsSlice.actions;
export default ticketsSlice.reducer;
