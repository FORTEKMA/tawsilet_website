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
import GetEstimate from "../../pages/EstimationFormStepper";
import {
  updateDistance,
  updateDropOfAddress,
  updateDuration,
  updatePickUpAddress,
} from "../../redux/newCommand/newCommandSlice";
import * as turf from "@turf/turf";
import AIconMarker from "../../assets/icons/APOINT.png";
import BIconMarker from "../../assets/icons/BPOINT.png";
import TunisiaGeoJSON from "../../utils/GeoJSON/TunisiaGeoJSON.json";
import TunisiaGovernorateGeoJSON from "../../utils/GeoJSON/TN-gouvernorats.json";
import {
  filterDataByName,
  getAddressFromCoordinates,
} from "../../utils/helpers/mapUtils";
import { useTranslation } from "react-i18next";
import {
  defaultProps,
  grandTunisBounds,
  allTunisiaBounds,
  darkMapStyle,
} from "../../utils/helpers/mapConstants";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { getApp } from "firebase/app";
import ecoIcon from "../../assets/images/eco.png";
import vanIcon from "../../assets/images/van.png";
import berlineIcon from "../../assets/images/Berline.png";
import axios from "axios";

const MapHome = (props) => {
  const isResponsive = useMediaQuery({ maxWidth: 1150 });
  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);
  const mapRef = useRef(null);

  const [polygonPaths, setPolygonPaths] = useState([]);
  const [GeoJSONBounds, setGeoJSONBounds] = useState(null);
  const [step, setStep] = useState(1);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const { t, i18n } = useTranslation();
  const [filteredDrivers, setFilteredDrivers] = useState({});
  const [mapZoom, setMapZoom] = useState(defaultProps.zoom);
  const [mapBounds, setMapBounds] = useState(null);
  const [showDriversZoom, setShowDriversZoom] = useState(5); // Minimum zoom to show drivers
  const [vehicleTypes, setVehicleTypes] = useState([]); // Store vehicle types from API

  // Initialize AOS and fetch objects
  useEffect(() => {
    AOS.init({ duration: 1000 });
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

    // const isInsidePolygon = google.maps.geometry.poly.containsLocation(
    //   new google.maps.LatLng(lat, lng),
    //   new google.maps.Polygon({ paths: polygonPaths })
    // );

    // if (!isInsidePolygon) {
    //   alert(`${t("Alerts.mapalert")}: ${lat}, ${lng}`);
    //   return;
    // }

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

  useEffect(() => {
    const db = getDatabase(getApp());
    const driversRef = dbRef(db, "drivers");
   
    const unsubscribe = onValue(driversRef, (snapshot) => {
      const data = snapshot.val() || {};
      const processChunk = (entries, startIndex) => {
        const chunkSize = 450;
        const chunk = entries.slice(startIndex, startIndex + chunkSize);
        const activeDrivers = {};
        chunk.forEach(([uid, driver]) => {
          if (
            driver.isActive === true &&
            driver.isFree === true &&
            driver.latitude &&
            driver.longitude
          ) {
            activeDrivers[uid] = driver;
          }
        });
       
        if (startIndex + chunkSize < entries.length) {
          setTimeout(() => processChunk(entries, startIndex + chunkSize), 0);
        } else {
          // Filter by map bounds and zoom
          if (mapBounds && mapZoom >= showDriversZoom) {
            const filtered = Object.fromEntries(
              Object.entries(activeDrivers).filter(([uid, driver]) => {
                const lat = driver.latitude;
                const lng = driver.longitude;
                return (
                  mapBounds.getSouthWest().lat() <= lat &&
                  lat <= mapBounds.getNorthEast().lat() &&
                  mapBounds.getSouthWest().lng() <= lng &&
                  lng <= mapBounds.getNorthEast().lng()
                );
              })
            );
            setFilteredDrivers(filtered);
          } else {
            setFilteredDrivers({});
          }
        }
      };
      processChunk(Object.entries(data), 0);
    });
    return () => unsubscribe();
  }, [mapBounds, mapZoom, showDriversZoom]);

  // Fetch vehicle types and icons from API once
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/settings?populate[0]=map_icon`
        );
        setVehicleTypes(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch vehicle types:", error);
      }
    };
    fetchVehicleTypes();
  }, []);

  return (
    <PlienMap
      ref={props.MapRef}
    >
    
      <GoogleMap
        options={{
          styles: darkMapStyle,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => (mapRef.current = map)}
        onZoomChanged={() => {
          if (mapRef.current) setMapZoom(mapRef.current.getZoom());
        }}
        onBoundsChanged={() => {
          if (mapRef.current) setMapBounds(mapRef.current.getBounds());
        }}
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
                    strokeColor: "#d8b56c",
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
                    strokeColor: "#d8b56c",
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
        {Object.entries(filteredDrivers).map(([uid, driver]) => {
        
          // Find the vehicle type object for this driver
          const typeObj = vehicleTypes.find((type) => type.id === driver.type);
        //  conosle.log("typeObj",typeObj)
          // Get the icon URL if available
          const iconUrl = typeObj?.map_icon?.url;
          return (
            <Marker
              key={uid}
              position={{
                lat: driver.latitude,
                lng: driver.longitude,
              }}
              icon={
                iconUrl
                  ? {
                      url: iconUrl,
                      scaledSize: new window.google.maps.Size(24, 35),
                      rotation: driver.angle || 0,
                      anchor: { x: 25, y: 25 },
                    }
                  : undefined // fallback to default if needed
              }
            />
          );
        })}
      </GoogleMap>
      <GetEstimate
        grandTunisBounds={grandTunisBounds}
        allTunisiaBounds={allTunisiaBounds}
        directionsResponse={directionsResponse}
        mapRef={mapRef}
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
  
  /* Prevent zoom on iOS when interacting with map */
  .mapcadre {
    touch-action: pan-x pan-y pinch-zoom;
  }
  
  @media (max-width: 744px) {
    display: flex;
    height: 90vh;
    flex-direction: column-reverse;
  }
`;
