// DefaultHelmet.jsx

import React from "react";
import { Helmet } from "react-helmet-async";

const DefaultHelmet = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Tawsilet</title>
    <meta
      name="description"
      content="Explorer nos offres de transport exceptionnel en France, des solutions logistiques précises et performantes pour répondre à vos attentes."
    />
    {/* Add other default meta tags, styles, scripts, etc. */}
  </Helmet>
);

export default DefaultHelmet;
