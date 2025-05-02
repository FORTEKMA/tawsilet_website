import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useMediaQuery } from "react-responsive";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polygon,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllObjects } from "../../redux/objectsSlice/objectsSlice";
import GetEstimate from "../../pages/EstimationFormStepper";
import {
  updateDistance,
  updateDropOfAddress,
  updateDuration,
  updatePickUpAddress,
} from "../../redux/newCommand/newCommandSlice";
import * as turf from "@turf/turf";
import iconMarker from "../../assets/icons/pinIconsmall.png";
import AIconMarker from "../../assets/icons/APOINT.png";
import BIconMarker from "../../assets/icons/BPOINT.png";
import TunisiaGeoJSON from "../../utils/GeoJSON/TunisiaGeoJSON.json";
import TunisiaGovernorateGeoJSON from "../../utils/GeoJSON/TN-gouvernorats.json";
import {
  filterDataByName,
  getAddressFromCoordinates,
} from "../../utils/helpers/mapUtils";
import { useTranslation } from "react-i18next";

// Constants
const defaultProps = {
  center: { lat: 36.800253, lng: 9.68617 },
  centerResponsive: { lat: 36.400253, lng: 10 },
  zoom: 10,
};

const grandTunisBounds = {
  north: 37.5,
  south: 36.3,
  east: 10.6,
  west: 9.5,
};

const allTunisiaBounds = {
  north: 38.0,
  south: 29.5,
  east: 20.0,
  west: 3.0,
};

const MapHome = (props) => {
  const isResponsive = useMediaQuery({ maxWidth: 1150 });
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);
  const mapRef = useRef(null);

  const [polygonPaths, setPolygonPaths] = useState([]);
  const [GeoJSONBounds, setGeoJSONBounds] = useState(null);
  const [step, setStep] = useState(1);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragContainerRef = useRef(null);
  const { t, i18n } = useTranslation();
  // Initialize AOS and fetch objects
  useEffect(() => {
    AOS.init({ duration: 1000 });
    dispatch(getAllObjects());
  }, [dispatch]);

  // Handle step changes and update polygon paths
  useEffect(() => {
    if (step <= 2) {
      const updatePolygonPaths = (data) => {
        const paths = data?.features?.flatMap((feature) => {
          if (feature.geometry.type === "MultiPolygon") {
            // Handle MultiPolygon
            const rewindedFeature = turf.rewind(feature, { reverse: true });
            return rewindedFeature.geometry.coordinates.flatMap((polygon) =>
              polygon.map((ring) => {
                const coords = ring.map((coord) => ({
                  lat: coord[1],
                  lng: coord[0],
                }));
                if (coords.length > 0) coords.push(coords[0]); // Close the polygon
                return coords;
              })
            );
          } else if (feature.geometry.type === "Polygon") {
            // Handle Polygon
            const rewindedFeature = turf.rewind(feature, { reverse: true });
            const coords = rewindedFeature.geometry.coordinates[0].map(
              (coord) => ({
                lat: coord[1],
                lng: coord[0],
              })
            );
            if (coords.length > 0) coords.push(coords[0]); // Close the polygon
            return coords;
          }
          return []; // Ignore other geometry types
        });

        setPolygonPaths(paths);
      };
      if (step === 1) {
        const filteredData = filterDataByName(TunisiaGovernorateGeoJSON, [
          "Tunis",
        ]);

        setGeoJSONBounds(TunisiaGovernorateGeoJSON);
        updatePolygonPaths(TunisiaGovernorateGeoJSON);
      } else if (step === 2) {
        setGeoJSONBounds(TunisiaGeoJSON);
        updatePolygonPaths(TunisiaGeoJSON);
      }
    }
  }, [step]);

  // Update map bounds based on step
  // useEffect(() => {
  //   if (mapRef.current) {
  //     const bounds = step === 1 ? grandTunisBounds : allTunisiaBounds;
  //     mapRef.current.setOptions({
  //       restriction: { latLngBounds: bounds, strictBounds: true },
  //     });
  //     const center = {
  //       lat: (bounds.north + bounds.south) / 2,
  //       lng: (bounds.east + bounds.west) / 2,
  //     };
  //     // mapRef.current.panTo(center);
  //     if (step === 2) mapRef.current.setZoom(5);
  //   }
  // }, [step]);

  // Calculate route when pick-up and drop-off addresses change
  useEffect(() => {
    if (
      command?.pickUpAddress?.coordonne.latitude &&
      command?.dropOfAddress?.coordonne.latitude &&
      step === 2
    ) {
      calculateVirtualRoute(
        {
          lat: command.pickUpAddress.coordonne.latitude,
          lng: command.pickUpAddress.coordonne.longitude,
        },
        {
          lat: command.dropOfAddress.coordonne.latitude,
          lng: command.dropOfAddress.coordonne.longitude,
        }
      );
    }
  }, [
    command?.pickUpAddress?.coordonne,
    command?.dropOfAddress?.coordonne,
    step,
  ]);

  // Handle map click
  const handleMapClick = async ({ latLng }) => {
    if (step <= 2) {
      const lat = latLng.lat();
      const lng = latLng.lng();

      const isInsidePolygon = google.maps.geometry.poly.containsLocation(
        new google.maps.LatLng(lat, lng),
        new google.maps.Polygon({ paths: polygonPaths })
      );

      if (!isInsidePolygon) {
        alert(`${t("Alerts.mapalert")}: ${lat}, ${lng}`);
        return;
      }

      const address = await getAddressFromCoordinates(lat, lng);
      const updateAction =
        step === 1 ? updatePickUpAddress : updateDropOfAddress;
      dispatch(
        updateAction({
          Address: address,
          coordonne: { latitude: lat, longitude: lng },
        })
      );
    }

    // if (mapRef.current) {
    //   mapRef.current.panTo({ lat, lng });
    // }
  };

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Check if the current location is inside the polygon
          const isInsidePolygon = google.maps.geometry.poly.containsLocation(
            new google.maps.LatLng(latitude, longitude),
            new google.maps.Polygon({ paths: polygonPaths })
          );

          if (!isInsidePolygon) {
            alert(
              `${t("Alerts.mapalert")}: ${latitude}, ${longitude}`
            );
            return;
          }

          // Get the address from coordinates
          const address = await getAddressFromCoordinates(latitude, longitude);

          // Determine which address to update based on the step
          const updateAction =
            step === 1 ? updatePickUpAddress : updateDropOfAddress;

          // Dispatch the action to update the address and coordinates
          dispatch(
            updateAction({
              Address: address,
              coordonne: { latitude, longitude },
            })
          );

          // Optionally, pan the map to the current location
          if (mapRef.current) {
            mapRef.current.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your current location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Calculate virtual route
  const calculateVirtualRoute = async (origin, destination) => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      dispatch(updateDistance(results.routes[0].legs[0].distance.value));
      dispatch(updateDuration(results.routes[0].legs[0].duration.text));
    } catch (error) {
      console.error("Error calculating route:", error);
      setDirectionsResponse(null)
    }
  };

  const center = useMemo(() => {
    if (step === 1) {
      return isResponsive ? defaultProps.centerResponsive : defaultProps.center;
    } else if (step === 2) {
      return isResponsive
        ? { lat: 31.400253, lng: 9.68617 }
        : { lat: 33.800253, lng: 8.48617 };
    }
    return defaultProps.center; // Fallback center
  }, [step, isResponsive]);

  // Handle marker drag end
  const handleMarkerDragEnd = async (markerType, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const isInsidePolygon = google.maps.geometry.poly.containsLocation(
      new google.maps.LatLng(lat, lng),
      new google.maps.Polygon({ paths: polygonPaths })
    );

    if (!isInsidePolygon) {
      alert(`${t("Alerts.mapalert")}: ${lat}, ${lng}`);
      return;
    }

    const address = await getAddressFromCoordinates(lat, lng);
    const updateAction =
      markerType === "pickUp" ? updatePickUpAddress : updateDropOfAddress;
    dispatch(
      updateAction({
        Address: address,
        coordonne: { latitude: lat, longitude: lng },
      })
    );
  };

  // Draggable card logic
  const handleMouseDown = (e) => {
    const container = dragContainerRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - container.left, y: e.clientY - container.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const parent =
      dragContainerRef.current.parentElement.getBoundingClientRect();
    setPosition({
      x: Math.min(
        Math.max(e.clientX - parent.left - offset.x, 0),
        parent.width
      ),
      y: Math.min(
        Math.max(e.clientY - parent.top - offset.y, 0),
        parent.height
      ),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <PlienMap
      ref={props.MapRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {step === 5 && <HighlightOverlay />}
      <GoogleMap
        options={{
          draggableCursor: `url(${iconMarker}) 30 60, auto`,
          ...(step === 5 && {
            draggable: false,
            disableDefaultUI: true,
            gestureHandling: "none",
            draggableCursor: "default",
          }),
        }}
        onLoad={(map) => (mapRef.current = map)}
        onClick={handleMapClick}
        center={center}
        zoom={
          step === 1
            ? isResponsive
              ? 9
              : defaultProps.zoom
            : step === 2 && isResponsive
            ? 6
            : 7
        }
        mapContainerClassName="mapcadre"
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {GeoJSONBounds?.features?.map((feature, index) =>
          feature?.geometry?.type === "MultiPolygon"
            ? feature.geometry.coordinates.map((polygon, polygonIndex) => (
                <Polygon
                  key={`${index}-${polygonIndex}`}
                  paths={polygon[0].map((coord) => ({
                    lat: coord[1],
                    lng: coord[0],
                  }))}
                  options={{
                    fillColor: "#FF0000",
                    fillOpacity: 0,
                    strokeColor: "#ff7700",
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    zIndex: 99999999,
                    clickable: false,
                    visible: true,
                  }}
                />
              ))
            : feature.geometry.coordinates.map((polygon, polygonIndex) => (
                <Polygon
                  key={`${index}-${polygonIndex}`}
                  paths={polygon.map((coord) => ({
                    lat: coord[1],
                    lng: coord[0],
                  }))}
                  options={{
                    fillColor: "#FF0000",
                    fillOpacity: 0,
                    strokeColor: "#ff7700",
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    zIndex: 99999999,
                    clickable: false,
                    visible: true,
                  }}
                />
              ))
        )}
        {command?.pickUpAddress?.coordonne?.latitude && step !== 2 && (
          <Marker
            icon={{
              url: AIconMarker,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
            position={{
              lat: command.pickUpAddress.coordonne.latitude,
              lng: command.pickUpAddress.coordonne.longitude,
            }}
            draggable={step === 1}
            onDragEnd={(event) => handleMarkerDragEnd("pickUp", event)}
          />
        )}
        {command?.dropOfAddress?.coordonne?.latitude && step > 1 && (
          <Marker
            icon={{
              url: BIconMarker,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
            position={{
              lat: command.dropOfAddress.coordonne.latitude,
              lng: command.dropOfAddress.coordonne.longitude,
            }}
            draggable={step === 2}
            onDragEnd={(event) => handleMarkerDragEnd("dropOff", event)}
          />
        )}
        {directionsResponse && step >= 3 && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
      <GetEstimate
        grandTunisBounds={grandTunisBounds}
        allTunisiaBounds={allTunisiaBounds}
        directionsResponse={directionsResponse}
        mapRef={mapRef}
        dragRef={dragContainerRef}
        handleMouseDown={handleMouseDown}
        customTransform={{
          position: "absolute",
          top: !isResponsive ? `${position.y}px` : undefined,
          bottom: isResponsive ? `32px` : undefined,
          left: !isResponsive ? `${position.x}px` : undefined,
          height: isResponsive && "inherit",
          cursor: isDragging ? "grabbing" : "move",
        }}
        setStep={setStep}
        step={step}
        handleGetLocation={handleGetLocation}
      />
    </PlienMap>
  );
};

export default MapHome;

// Styled Components (unchanged)
const PlienMap = styled.div`
  width: 100%;
  height: 92vh;
  overflow: hidden;
  position: relative;
  @media (max-width: 744px) {
    display: flex;
    height: 90vh;
    flex-direction: column-reverse;
  }
`;

const HighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(70, 70, 70, 0.2);
  z-index: 10;
  pointer-events: none;
`;
