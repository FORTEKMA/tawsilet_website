import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import Loader from "../components/Items/Loader";

function PrivateRoute() {
  const location = useLocation();

  const isLogged = useSelector((state) => state?.user?.currentUser);
  const role = isLogged?.user_role;
  let loading = useSelector((store) => store?.user?.isLoading);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  if (isLoading) {
    return <Loader />;
  }

  if (isLogged) {
    if (role === "client") {
      return <Outlet />;
    } else {
      return (
        <Navigate to="/SidentifierClient" replace state={{ from: location }} />
      );
    }
  } else {
    return (
      <Navigate to="/SidentifierClient" replace state={{ from: location }} />
    );
  }
}

export default PrivateRoute;
