import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import jwt_decode from "jwt-decode";

const GoogleAuthCallback = () => {
  const [auth, setAuth] = useState();
  const location = useLocation();

  const test = async () => {
    const { search } = location;
    let jwt_extract = await jwt_decode(search);

   
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_DOMAIN_URL}/api/users?populate=*filters[email][$eq]=${jwt_extract.email}`,
    
    }).then(
      (res) =>
        res?.data?.length === 0 || res?.data[0]?.provider === "google"
          ? axios({
              method: "GET",
              url: `https://api.sheelni.dev/api/auth/google/callback${search}`,
            })
          : // .then((res) => console.log(res.data))
            axios({
              method: "POST",
              url: "${process.env.REACT_APP_DOMAIN_URL}/api/google-login",
              data: {
                email: res.data[0]?.email,
                givenName: res?.firstName || "",
                familyName: res?.lastName || "",
                phoneNumber: res?.phoneNumber || "",
                photo: res?.profile_picture || "",
                id: Math.random() * 99999999,
              },
            })
      // .then((res) => {
      //   console.log(res?.data);
      //   // setAuth(res?.data);
      // })
    );
  };

  useEffect(() => {
    if (!location) {
      return;
    }
    let ok = test();
    return () => {
      ok;
    };
  }, [location]);

  // console.log(auth);
  return (
    <div>
      GoogleAuthCallback
      {auth && (
        <>
          <div>Jwt: {auth?.jwt}</div>
          <div>User Id: {auth?.user?.id}</div>
          <div>Provider: {auth?.user?.provider}</div>
        </>
      )}
    </div>
  );
};

export default GoogleAuthCallback;
