import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api"; // Import LoadScript from @react-google-maps/api
// import i18n from "./i18n"; // initialized i18next instance
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrsictMode>
  <Provider store={store}>
    <BrowserRouter>
      <LoadScript
        googleMapsApiKey={"AIzaSyA0JbWwMvbJ7IYcL4_cagsFQLyLqXHA7xs"}
        libraries={["places"]}
      >
        <Suspense fallbackLng="loading">
          {/* <HelmetProvider> */}
          <App />
          {/* </HelmetProvider> */}
        </Suspense>
      </LoadScript>
    </BrowserRouter>
  </Provider>
  // </React.StrsictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// serviceWorkerRegistration.register();
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
