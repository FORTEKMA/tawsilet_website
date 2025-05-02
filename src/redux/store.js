import { configureStore } from "@reduxjs/toolkit";
import objectReducer from "./objectsSlice/objectsSlice";
import userReducer from "./userSlice/userSlice";
import orderSlice from "./ordersSlice/OrderSlice";
import settingSlice from "./settingsSlice/settingSlice";
import notificationSlice from "./notifications/notificationSlice";
import locationSlice from "./locationSlice/locationSlice";
import reviewSlice from "./reviewSlice/reviewSlice";
import newCommandSlice from "./newCommand/newCommandSlice";
import ticketsSlice from "./ticketsSlice/ticketsSlice"
export const store = configureStore({
  reducer: {
    objects: objectReducer,
    user: userReducer,
    orders: orderSlice,
    settings: settingSlice,
    notification: notificationSlice,
    location: locationSlice,
    review: reviewSlice,
    newCommand: newCommandSlice,
    tickets:ticketsSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
