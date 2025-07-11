import React, { useEffect, useState, lazy, useRef } from "react";
import CookieConsent from "react-cookie-consent";
import packageJson from "../package.json";

import { ThemeContext, ThemeProvider } from "styled-components";
import "./App.css";
import { DarkTheme, GlobalStyles, LightTheme } from "./styles/Global";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/userSlice/userSlice";
import { getAllSettings } from "./redux/settingsSlice/settingSlice";
import DriverTrack from "./pages/DriverTrack";
import DriverRating from "./pages/DriverRating";
 
import Maintenance from "./pages/StaticPages/Maintenance";
import PrivateRoute from "./Routes/PrivateRoute";
import CookiesPolitique from "./pages/StaticPages/CookiesPolitique";
import Reject from "./pages/DriverTrack/Reject";
import MapHome from "./components/Section/MapHome";
import Accepted from "./pages/DriverTrack/accepted";
import DeleteAccountRequest from "./pages/StaticPages/DeleteAccountRequest";

// Lazy imports

const MethodPayement = lazy(() =>
  import("./pages/DashClient/Profile/MethodPayement")
);
const Navbar = lazy(() => import("./components/Section/Navbar"));
const Conditions = lazy(() => import("./pages/StaticPages/Conditions"));
const Politiques = lazy(() => import("./pages/StaticPages/Politiques"));
const ProfileHistory = lazy(() =>
  import("./pages/DashClient/Profile/ProfileHistory")
);
const GetEstimate = lazy(() =>
  import("./pages/EstimationFormStepper/index")
);
const Home = lazy(() => import("./pages/StaticPages/Home"));
const About = lazy(() => import("./pages/StaticPages/About"));
 const Services = lazy(() => import("./pages/StaticPages/Services"));
const SafeArea = lazy(() => import("./components/Section/SafeArea"));
const Contact = lazy(() => import("./pages/StaticPages/Contact"));
 
const NotFound = lazy(() => import("./pages/StaticPages/404"));
const Sinsecrire = lazy(() => import("./pages/Authentification/Sinsecrire"));
 const Profile = lazy(() => import("./pages/DashClient/Profile/Profile"));
const Sindentifier = lazy(() =>
  import("./pages/Authentification/Sindentifier")
);
const SinsecrireAgent = lazy(() =>
  import("./pages/Authentification/SinsecrireAgent")
);
const ProfileDetails = lazy(() =>
  import("./pages/DashClient/Profile/ProfileDetails")
);
const ProfilePassword = lazy(() =>
  import("./pages/DashClient/Profile/ProfilePassword")
);
const Loader = lazy(() => import("./components/Items/Loader"));
const DashboardCompany = lazy(() =>
  import("./pages/DashCompany/DashboardCompany")
);
const GoogleAuthCallback = lazy(() =>
  import("./pages/Authentification/GoogleAuthCallback")
);
const StripeContainer = lazy(() =>
  import("./pages/EstimationFormStepper/section/StripeContainer")
);
const TawkToChat = lazy(() => import("./components/Utility/TawkToChat"));
const ForgetPassword = lazy(() =>
  import("./pages/Authentification/ForgetPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/Authentification/ResetPassword")
);
const MessagePasswordReset = lazy(() =>
  import("./pages/Authentification/MessagePasswordReset")
);

const DeleteAccount = lazy(
()=> import("./pages/Authentification/DeleteAccount")
);

function App() {
  // const clearCaching = () => {
  //   let version = localStorage.getItem("version");
  //   if (version != packageJson.version) {
  //     // if ("caches" in window) {
  //     //   caches.keys().then((names) => {
  //     //     // Delete all the cache files
  //     //     names.forEach((name) => {
  //     //       caches.delete(name);
  //     //     });
  //     //   });

  //     //   // Makes sure the page reloads. Changes are only visible after you refresh.
  //     //   window.location.reload(true);
  //     // }

  //     localStorage.clear();
  //     localStorage.setItem("version", packageJson.version);
  //   }
  // };

  const bustCache = () => {
    const links = document.querySelectorAll(
      'link[rel="stylesheet"], script[src]'
    );
    const timestamp = new Date().getTime();

    links.forEach((link) => {
      const href = link.getAttribute("href") || link.getAttribute("src");
      link.setAttribute("href", `${href}?v=${timestamp}`);
    });
  };

  useEffect(() => {
    // clearCaching();
    let version = localStorage.getItem("version");
    if (version != packageJson.version) {
      bustCache();
      localStorage.clear();
      localStorage.setItem("version", packageJson.version);
    }
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  const { t, i18n } = useTranslation();

  const [ping, setPing] = useState(false);
  const currentUser = useSelector((store) => store.user.currentUser);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [ping]);

  const { pathname } = useLocation();
  const [navigationValues, setNavigationValues] = useState({
    navbar: {
      menu: {
        links: [
          { to: "/", label: t("NAVBAR.ACCEUIL") },
          { to: "about", label: t("NAVBAR.APROPOS") },
          { to: "services", label: t("NAVBAR.SERVICES") },
          { to: "contact", label: t("NAVBAR.CONTACT") },
          // { to: "telecharger", label: t("NAVBAR.TELECHARGER") },
          { to: "Sidentifierpartenaire", label: t("NAVBAR.DEVENIR") },
        ],
      },
    },
  });

  // const [currentUser, setCurrentUser] = useState(null);
  // const [loading, setLoading] = useState(false);
  let loading = useSelector((state) => state?.user?.isLoading);
  const setLoading = (x) => {
    loading = x;
  };

  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 600);
    const usertoken = localStorage.getItem("user");
   dispatch(getAllSettings());
    // const currentUserFetch =
    //   usertoken &&
    //   AuthService.getCurrentUser(usertoken?.id).then((result) => {
    //     setCurrentUser(result);
    //   });
  }, []);

  {
    /*useEffect(() => {
    axios
      .get("http://localhost:1337/api/nav-bar?locale=fr&populate=deep")
      .then((response) => {
        setNavigationValues(response.data.data.attributes);
      });
  }, []); */
  }

  const [theme, toggleTheme] = useState("light");
  const [maintenance, setMaintenance] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const totalPages = 10;
  const maintenanceStatus = useSelector(
    (state) => state?.settings?.settings[0]?.maintenance
  );
console.log("maintenanceStatus",maintenanceStatus)
  useEffect(() => {
    if (maintenanceStatus) {
      setMaintenance(maintenanceStatus);
    }
  }, [maintenanceStatus]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    const newUrl = `${window.location.pathname}?page=${pageNumber}`;
    window.history.pushState({}, "", newUrl);
  };

  const location = useLocation();
  const pageNumber = new URLSearchParams(location.search).get("page");

  const [loggg, setLoggg] = useState(false);
  const [logggWarning, setLogggWarning] = useState("");
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const opp = localStorage.getItem("opp");
  // const checkcheck = (e) => {
  //   e.preventDefault();
  //   // const username = usernameInputRef.current.value;
  //   const password = passwordInputRef.current.value;
  //   // console.log(username, "username");
  //   // console.log(password, "password");
  //   // console.log(process.env.REACT_APP_USER_NAME, "usernamevvvv");
  //   // console.log(process.env.REACT_APP_PASSWORD, "usernamevvvv");
  //   if (password === "") {
  //     setLoggg(true);
  //     localStorage.setItem("opp", true);
  //   } else {
  //     setLogggWarning("Mot de passe Incorrect");
  //   }
  // };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* <Suspense fallback={<Loader />}> */}
      <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
        <GlobalStyles />
        
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              { 
               (
                <>
                  <Navbar
                    currentUser={currentUser}
                    navigationValues={navigationValues}
                  />
                </>
              )}

              <SafeArea
                padTop={
                  !pathname.includes("identifier") &&
                  !pathname.includes("insecrir")
                }
              >
                <ScrollToTop />

                {maintenance&&process.env.NODE_ENV != 'development' ? (
                  <Routes>
                    <Route path="/" element={<Maintenance />} />
                    <Route path="*" element={<Maintenance />} />
                    <Route
                      path="/DeleteAccountRequest"
                      element={<DeleteAccountRequest />}
                    />
                  </Routes>
                ) : (
                  <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                   
                      <Route
                      path="/DeleteAccount"
                      element={<DeleteAccountRequest />}
                    />
                    <Route
                      path="/estimation"
                      element={
                        <MapHome
                          setLoading={setLoading}
                          setPing={setPing}
                          ping={ping}
                        />
                      }
                    />
                    <Route path="/services" element={<Services />} />
                    {/* <Route path="/LoginCard" element={<LoginCard />} /> */}
                    <Route
                      path="/Sidentifierpartenaire"
                      element={<SinsecrireAgent setLoading={setLoading} /> }
                    />
                    
                    <Route
                      path="/SinsecrireClient"
                      element={<Sinsecrire setLoading={setLoading} />}
                    />
                    <Route
                      path="/SidentifierClient"
                      element={<Sindentifier setLoading={setLoading} />}
                    />
                    {/* <Route
                      path="/SinsecrireAgent"
                      element={<SinsecrireAgent setLoading={setLoading} />}
                    /> */}
                    <Route
                      path="/auth/google/callback"
                      element={<GoogleAuthCallback />}
                    />
                    {/*  Place where Test new Components  */}
                    <Route path="/Conditions" element={<Conditions />} />
                    <Route path="/Politiques" element={<Politiques />} />
                    <Route path="/GetEstimate" element={<GetEstimate />} />
                    <Route
                      path="/CookiesPolitique"
                      element={<CookiesPolitique />}
                    />

                    <Route
                      path="/ClientProfile/forgetpassword"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/ClientProfile/resetpassword"
                      element={<ResetPassword />}
                    />

                    <Route
                      path="/ClientProfile/forgetpasswordmsg"
                      element={<MessagePasswordReset />}
                    />
                    
                    {/* Define the new page route here */}
                    <Route element={<PrivateRoute />}>
     
                    <Route
                      path="/ClientProfile/user-data/delete-account/confirm"
                      element={<DeleteAccount setLoading={setLoading} />}
                    />
                   <Route
                        path="/driver/track/:id"
                        element={<DriverTrack />}
                      />
                      <Route
                        path="/driver/rating/:id"
                        element={<DriverRating />}
                      />
                      <Route path="/Payment" element={<StripeContainer />} />
                      {/* Client Profile */}
                      <Route
                        path="/ClientProfile"
                        element={<Profile currentUser={currentUser} />}
                      >
                        <Route
                          path="/ClientProfile/Details"
                          element={<ProfileDetails currentUser={currentUser} />}
                        />
                        <Route
                          path="/ClientProfile/motdepasse"
                          element={
                            <ProfilePassword
                              currentUser={currentUser}
                              setLoading={setLoading}
                            />
                          }
                        />
                        <Route
                          path="/ClientProfile/paiement"
                          element={<MethodPayement currentUser={currentUser} />}
                        />{" "}
                        <Route
                          path="/ClientProfile/history"
                          element={<ProfileHistory currentUser={currentUser} />}
                        />
                      </Route>
                    </Route>
                   
                  </Routes>
                )}

                {/* <Footer />  */}
                <div style={{ zIndex: 9999999999, position: "fixed" }}>
                  <CookieConsent
                    // overlay
                    enableDeclineButton
                    flipButtons
                    // customDeclineButtonProps={{ buttonText: "Accepter" }}
                    // onDecline={() => {
                    //   alert("nay!");
                    // }}
                    location="bottom"
                    buttonText="Accepter"
                    declineButtonText="Refuser"
                    cookieName="hz_idm_key"
                    style={{
                      position: "fixed",
                      background: "#18365a",
                      zIndex: 9999999999,
                    }}
                    buttonStyle={{
                      color: "#4e503b",
                      fontSize: "13px",
                      zIndex: 9999999999,
                    }}
                    expires={150}
                  >
                    En naviguant sur ce site, vous acceptez l'utilisation de
                    cookies pour améliorer votre expérience. Consultez notre{" "}
                    <Link style={{ color: "orange" }} to={"/CookiesPolitique"}>
                      Politique de Cookies
                    </Link>{" "}
                    pour en savoir plus.
                  </CookieConsent>
                </div>
                <TawkToChat />
              </SafeArea>

              {/* <FlotingPopUp /> */}
            </>
          )}
        </>
        {/* )} */}
      </ThemeProvider>
      {/* </Suspense> */}
    </ThemeContext.Provider>
  );
}

export default App;
