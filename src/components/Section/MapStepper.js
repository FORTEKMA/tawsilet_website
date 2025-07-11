import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import Buttonobtenez from "../Items/buttonobtenez";
import Arrow from "./../../assets/icons/arrowdown.svg";
import AOS from "aos";
import "aos/dist/aos.css";
// import Autocomplete from "react-google-autocomplete";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Loader from "../Items/Loader";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapHome = (props) => {
  const currentDate = new Date();
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 1);
  const formatTime = (time) => {
    return `${time.getHours().toString().padStart(2, "0")}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}:00.000`;
  };

  // -------------------------------------------------------------------

  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  // -------------------------------------------------------------------
  const [selectedDate, setSelectedDate] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(formatTime(currentTime));

  // Handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Handle time change
  const handleTimeChange = (event) => {
    setSelectedTime(`${event.target.value}:00.000`);
  };

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE", //  process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places"],
  // });

  const [map, setMap] = useState(/** @type google.maps.map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRouteAgain(A, B) {
    // Geocode.setApiKey("AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"); //(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    let originPositionAddress = await Geocode.fromLatLng(A.lat, A.lng);

    let destinationPositionAddress = await Geocode.fromLatLng(B.lat, B.lng);
    // .then((response) => {
    //   console.log(response);
    //   setDestinationPositionAddress(response.results[0].formatted_address);
    // })
    // originRef.current.value =
    //   originPositionAddress?.results[3]?.formated_address;

    originRef.current.value = originPositionAddress.plus_code.compound_code;
    destiantionRef.current.value =
      destinationPositionAddress.plus_code.compound_code;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originPositionAddress.plus_code.compound_code, //|| originPosition,
      destination: destinationPositionAddress.plus_code.compound_code, //.place_id, // || destinationPosition ,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    // Geocode.setApiKey("AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"); // (process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    // let originPositionAddress = originPosition
    //   ? Geocode.fromLatLng(originPosition.lat, originPosition.lng)
    //   : null;

    // Geocode.fromLatLng(destinationPosition.lat, destinationPosition.lng).then(
    //   (response) =>
    //     setDestinationPositionAddress(response.results[0].formatted_address)
    // );

    // console.log(destinationPositionAddress);
    const results = await directionsService.route({
      origin: originRef.current.value, //|| originPosition,
      destination: destiantionRef.current.value, // || destinationPosition ,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // console.log(results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.value);
    setDuration(results.routes[0].legs[0].duration.text);

    setOriginPosition({
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    });

    setDestinationPosition({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
    // results.routes[0].legs[0].end_location.lat();        end location lat
    // results.routes[0].legs[0].end_location.lng();        end location lng

    // results.routes[0].legs[0].start_location.lat();         start location lat
    // results.routes[0].legs[0].start_location.lng();          start location lng

    // results.request.destination.query;
    // results.request.origin.query;
    // console.log(originPosition, destinationPosition);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    // originRef.current.value = "";
    // destiantionRef.current.value = "";
  }
  // if (!isLoaded) {
  //   return <Loader />;
  // }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  if (!isLoaded) return <Loader />;

  return (
    <PlienMap ref={props.MapRef}>
      {/* <GoogleMapReact 
        
        apiKey="AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"
        // bootstrapURLKeys={{ key: "AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        KmlLayerStatus
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        <Autocomplete
          apiKey={"AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
        />
      </GoogleMapReact> */}
      <GoogleMap
        className="mapcadre"
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        mapContainerClassName="mapcadre"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          // zoomControl:false,
          streetViewControl: false,
          // mapTypeControl: false,
          fullscreenControl: false,
        }}
        // onDragEnd={() =>
        //   console.log(
        //     "Drag end ----------------------------------------------------------------"
        //   )
        // }
      >
        {originPosition && (
          <Marker
            icon={`http://maps.google.com/mapfiles/markerA.png`}
            position={originPosition}
            draggable={true}
            onDragEnd={async (event) => {
              const newPosition = await {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              setOriginPosition(newPosition);
              await calculateRouteAgain(newPosition, destinationPosition);
              // Handle updating directions and logging data
              // if (originPosition && destinationPosition) {
              //   // Call the calculateRoute function with updated positions
              //   calculateRouteAgain();
              // }
            }}
          />
        )}
        {destinationPosition && (
          <Marker
            icon={`http://maps.google.com/mapfiles/markerB.png`}
            position={destinationPosition}
            draggable={true}
            onDragEnd={(event) => {
              // console.log(event);
              const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              setDestinationPosition(newPosition);
              calculateRouteAgain(originPosition, newPosition);
              // Handle updating directions and logging data
              // if (originPosition && destinationPosition) {
              //   // Call the calculateRoute function with updated positions
              //   calculateRouteAgain();
              // }
            }}
          />
        )}
        {/* <Marker position={defaultProps.center} /> */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{ draggable: true, suppressMarkers: true, zoom: 8 }}
          />
        )}
        {/*  */}
        {/*  */}
      </GoogleMap>

      {/* ------ ------ -------  */}
      <Card data-aos="fade-up-left">
        <Address>
          <Autocomplete
            style={{ zIndex: 9999999999999, width: "100%" }}
            onPlaceChanged={() => {
              clearRoute();
              calculateRoute();
            }}
          >
            <Input
              autocomplete={false}
              name="number"
              type="text"
              className="inputt"
              placeholder="Adresse de ramassage"
              ref={originRef}
            />
          </Autocomplete>
          <Autocomplete
            onPlaceChanged={
              () => calculateRoute()
              // clearRoute(),
              // setTimeout(() => {

              // }, 600);
            }
          >
            <Input
              autocomplete={false}
              name="number"
              type="text"
              className="inputt"
              placeholder="Adresse de dépôt"
              ref={destiantionRef}
            />
          </Autocomplete>{" "}
          <Calendar>
            <InputCalendar
              name="date"
              type="date"
              className="input_calender"
              placeholder="Select date"
              min={currentDate.toISOString().split("T")[0]}
              value={selectedDate}
              onChange={handleDateChange}
            />
            <InputCalendar
              name="time"
              type="time"
              className="input_calender"
              placeholder="Select time"
              min={() => formatTime(currentTime)}
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </Calendar>
        </Address>

        <div
          onClick={() =>
            !directionsResponse
              ? alert("Remplir les champs pour obtenir une estimation")
              : props.setStep(2)
          }
        >
          <Link
            to={directionsResponse ? "/estimation" : ""}
            state={{
              step: 2,
              data: {
                pickUpAddress: {
                  Address: directionsResponse?.request.origin.query,
                  coordonne: {
                    latitude:
                      directionsResponse?.routes[0].legs[0].start_location.lat(),
                    longitude:
                      directionsResponse?.routes[0].legs[0].start_location.lng(),
                  },
                },
                dropOfAddress: {
                  Address: directionsResponse?.request.destination.query,
                  coordonne: {
                    latitude:
                      directionsResponse?.routes[0].legs[0].end_location.lat(),
                    longitude:
                      directionsResponse?.routes[0].legs[0].end_location.lat(),
                  },
                },
                distance: distance,
                duration: duration,
                departDate: selectedDate,
                deparTime: selectedTime,
              },
            }}
          >
            <Btn>
              {" "}
              <Buttonobtenez
                className="buttonobtenir"
                icon={Arrow}
                Textbody="Obtenez une estimation"
              />
            </Btn>
          </Link>
        </div>
      </Card>
    </PlienMap>
  );
};

const defaultProps = {
  center: {
    lat: 33.769012,
    lng: 10.8674087,
  },
  zoom: 11,
};

export default MapHome;

const Btn = styled.div`
  padding: 10px;
  @media (max-width: 744px) {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 100%; */
    flex: 1;
    padding: 0;
    align-self: center;
    /* border: 1px solid red; */
    /* margin-top: 20px; */
  }
`;
export const PlienMap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media (max-width: 744px) {
    display: flex;
    height: 100vh;
    flex-direction: column-reverse;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  gap: 10px;
  .pac-container {
    z-index: 999999999999999999999 !important;
  }
  .pac-item {
    z-index: 999999999999999999999999 !important;
  }
`;

const Input = styled.input`
  padding: 10px;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  border: transparent;
  @media (max-width: 744px) {
    height: 40px;
  }
`;

const Calendar = styled.div`
  padding: 0;
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
`;

const InputCalendar = styled.input`
  width: 50%;
  padding: 5px;
  height: 50px;
  border-radius: 10px;
  border: transparent;
  color: #aaaaaa;
  @media (max-width: 744px) {
    width: 50%;
    height: 40px;
  }
`;

const Card = styled.div`
  padding: 20px;
  background-color: #302f4a33;
  border: 1px solid #aaa;
  border-radius: 24.75px;
  /* z-index: 99999; */
  position: absolute;
  gap: 10px;
  display: flex;
  flex-direction: column;
  top: 180px;
  left: 60px;
  order: 4;
  .buttonobtenir {
    width: 80% !important ;
  }
  @media (max-width: 744px) {
    width: 90vw;
    margin-inline: 5vw;
    gap: 5px;
    padding: 10px;
    /* padding: 10px 0 20px; */
    top: 90px;
    left: 0;
    gap: 10px;
    position: absolute;
    border-radius: 24.599px;
    border: 1.439px solid var(--body-text-2, #666);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(157.5341796875px);
  }
  .buttonobtenir {
    @media (max-width: 744px) {
      margin: 10px !important;
    }
  }
  a {
    text-decoration: none;
  }
`;

const Dropdown = styled.select`
  height: 50px;
  border-radius: 10px;
  border: transparent;
  width: 75px;
  @media (max-width: 744px) {
    height: 40px;
  }
`;

const SubmitButton = styled.button`
  height: 43.92px;
  border-radius: 10px;
  border: transparent;
  padding: 10px;
  margin-left: 10px;
  width: 325px;
  background-color: #d8b56c;
`;
