import React, { useEffect, useState, useMemo } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { notification } from "antd";
// import Profile from "../../assets/images/Avatar.png";
import { Link } from "react-router-dom";
import AIconMarker from "../../assets/icons/APOINT.png";
import BIconMarker from "../../assets/icons/BPOINT.png";

const Context = React.createContext({ name: "Default" });

const Map = (props) => {
  const location = useSelector(
    (store) => store?.location?.command?.driver_id?.location
  );
  // const currentUser = useSelector((store) => store?.user?.currentUser);

  const commandDropCordonne = useSelector(
    (store) => store?.location?.command?.dropOfAddress?.coordonne
  );
  const commandPickCordonne = useSelector(
    (store) => store?.location?.command?.pickUpAddress?.coordonne
  );
  const command = useSelector((store) => store?.location?.command);
  const driver = useSelector((store) => store.location.command?.driver_id);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [directionsDriverResponse, setDirectionsDriverResponse] =
    useState(null);

  async function calculateRoute(A, B) {
    const geocoder = new google.maps.Geocoder();

    // Convert coordinates to addresses
    const originAddress = await geocodeLatLng(A.lat, A.lng);
    const destinationAddress = await geocodeLatLng(B.lat, B.lng);

    if (!originAddress || !destinationAddress) {
      console.error("Error geocoding coordinates.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRequest = {
      origin: originAddress,
      destination: destinationAddress,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsRequest, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionsResponse(response);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }

  async function calculateDriverRoute(A, B) {
    const geocoder = new google.maps.Geocoder();

    // Convert coordinates to addresses
    const originAddress = await geocodeLatLng(A.lat, A.lng);
    const destinationAddress = await geocodeLatLng(B.lat, B.lng);

    if (!originAddress || !destinationAddress) {
      console.error("Error geocoding coordinates.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRequest = {
      origin: originAddress,
      destination: destinationAddress,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(directionsRequest, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionsDriverResponse(response);
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    });
  }

  async function geocodeLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    return new Promise((resolve, reject) => {
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject("No results found");
          }
        } else {
          reject(`Geocoder failed due to: ${status}`);
        }
      });
    });
  }

  useEffect(() => {
    if (commandDropCordonne?.latitude && commandPickCordonne?.latitude) {
      calculateRoute(
        {
          lat: parseFloat(commandPickCordonne?.latitude),
          lng: parseFloat(commandPickCordonne?.longitude),
        },
        {
          lat: parseFloat(commandDropCordonne?.latitude),
          lng: parseFloat(commandDropCordonne?.longitude),
        }
      );
    } else {
      openNotification("bottomLeft");
      // message.warning({
      //   content:
      //     "Désolé pour le manque d'infos sur la livraison. Réessayez plus tard ou contactez le service client.",
      //   duration: 5,
      // });
    }
    if (
      commandDropCordonne?.latitude &&
      commandPickCordonne?.latitude &&
      location?.latitude
    ) {
      if (command.commandStatus === "Dispatching") {
        calculateDriverRoute(
          {
            lat: location?.latitude,
            lng: location?.longitude,
          },
          {
            lat: parseFloat(commandPickCordonne?.latitude),
            lng: parseFloat(commandPickCordonne?.longitude),
          }
        );
      } else {
        calculateDriverRoute(
          {
            lat: location?.latitude,
            lng: location?.longitude,
          },
          {
            lat: parseFloat(commandDropCordonne?.latitude),
            lng: parseFloat(commandDropCordonne?.longitude),
          }
        );
      }
    } else {
      openNotification("bottomLeft");
      // message.warning({
      //   content:
      //     "Désolé pour le manque d'infos sur la livraison. Réessayez plus tard ou contactez le service client.",
      //   duration: 5,
      // });
    }
  }, [location]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Désolé pour le manque d'infos .`,
      description: (
        <Context.Consumer>
          {({ name }) => `Réessayez plus tard ou contactez le service client!`}
        </Context.Consumer>
      ),
      placement,
      duration: 7,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  // console.log(command?.client_id?.data.id);

  //   if (!isLoaded) return <Loader />;
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <GoogleMapContainer>
        <GoogleMap
          className="mapcadre"
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          mapContainerClassName="mapcadre"
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            //   mapTypeControl: false,
            //   fullscreenControl: false,
          }}
        >
          {commandDropCordonne ? (
            <Marker
              position={{
                lat: commandDropCordonne?.latitude,
                lng: commandDropCordonne?.longitude,
              }}
              icon={{
                url: BIconMarker,
                scaledSize: new window.google.maps.Size(60, 60),
              }}
            />
          ) : null}
          {commandPickCordonne ? (
            <Marker
              position={{
                lat: commandPickCordonne?.latitude,
                lng: commandPickCordonne?.longitude,
              }}
              icon={{
                url: AIconMarker,
                scaledSize: new window.google.maps.Size(60, 60),
              }}
            />
          ) : null}
          {location ? (
            <Marker
              icon={{
                url:
                  `${
                    driver?.profilePicture?.url
                      ? driver?.profilePicture?.url
                      : ""
                  }` + "#custom_marker",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              position={{
                lat: location?.latitude,
                lng: location?.longitude,
              }}
            />
          ) : null}
          {directionsDriverResponse && (
            <DirectionsRenderer
              directions={directionsDriverResponse}
              options={{
                markerOptions: { visible: false },
                draggable: false,
                suppressMarkers: true,
                zoom: 16,
                polylineOptions: {
                  zIndex: 9999,
                  strokeOpacity: 1,
                  strokeWeight: 4,
                  strokeColor: "#18365a",
                },
              }}
            />
          )}
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                markerOptions: { visible: false },
                draggable: false,
                // suppressMarkers: true,
                zoom: 16,
                polylineOptions: {
                  strokeOpacity: 1,
                  strokeWeight: 4,
                  strokeColor: "#18365a",
                },
              }}
            />
          )}
        </GoogleMap>
      </GoogleMapContainer>
    </Context.Provider>
  );
};

const defaultProps = {
  center: {
    lat: 34.25,
    lng: 9.4,
  },
  zoom: 22,
};

export default Map;

const GoogleMapContainer = styled.div`
  width: 100%;
  height: 100%;
  img[src$="#custom_marker"] {
    object-fit: cover;
    border: 2px solid #f37a1d !important;
    border-radius: 50%;
  }
`;
