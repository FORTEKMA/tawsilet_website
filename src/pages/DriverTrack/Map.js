import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import styled from "styled-components";
import AIconMarker from "../../assets/icons/APOINT.png";
import BIconMarker from "../../assets/icons/BPOINT.png";

// Import images for driver types
import ecoImg from "../../assets/images/eco.png";
import vanImg from "../../assets/images/van.png";
import emptyImg from "../../assets/images/Berline.png";

const getDriverMarkerIcon = (type) => {
  switch (type) {
    case 1:
      return ecoImg;
    case 2:
      return emptyImg;
    case 3:
      return vanImg;
    default:
      return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  }
};

const Map = ({ driverPosition, command }) => {
  console.log("driverPosition",driverPosition)
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const pickupPosition = command?.pickUpAddress?.coordonne;
  const dropoffPosition = command?.dropOfAddress?.coordonne;

  useEffect(() => {
    if (pickupPosition && dropoffPosition) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickupPosition.latitude, lng: pickupPosition.longitude },
          destination: { lat: dropoffPosition.latitude, lng: dropoffPosition.longitude },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            setDirectionsResponse(null);
          }
        }
      );
    }
  }, [pickupPosition, dropoffPosition]);

  const defaultCenter = pickupPosition || { lat: 34.25, lng: 9.4 };

  return (
    <GoogleMapContainer>
      <GoogleMap
        center={defaultCenter}
        zoom={14}
        mapContainerClassName="mapcadre"
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
        }}
      >
        {pickupPosition && (
          <Marker
            position={{ lat: pickupPosition.latitude, lng: pickupPosition.longitude }}
            icon={{ url: AIconMarker, scaledSize: new window.google.maps.Size(60, 60) }}
          />
        )}
        {dropoffPosition && (
          <Marker
            position={{ lat: dropoffPosition.latitude, lng: dropoffPosition.longitude }}
            icon={{ url: BIconMarker, scaledSize: new window.google.maps.Size(60, 60) }}
          />
        )}
        {driverPosition && (
          <Marker
            position={{ lat: driverPosition.latitude, lng: driverPosition.longitude }}
            icon={{
              url: getDriverMarkerIcon(driverPosition.type),
              scaledSize: new window.google.maps.Size(24, 35),
              anchor: new window.google.maps.Point(12, 12),
            }}
          />
        )}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              markerOptions: { visible: false },
              suppressMarkers: true,
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
  );
};

export default Map;

const GoogleMapContainer = styled.div`
  width: 100%;
  height: 100%;
  img[src$="#custom_marker"] {
    object-fit: cover;
    border: 2px solid #d8b56c !important;
    border-radius: 50%;
  }
`;
