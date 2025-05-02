import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { useMediaQuery } from "react-responsive";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Polygon,
  Rectangle,
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
import TunisiaGeoJSON from "../../utils/GeoJSON/TunisiaGeoJSON.json";
import TunisiaGovernorateGeoJSON from "../../utils/GeoJSON/TunisiaGovernorateGeoJSON.json";

// Utility functions
const formatTime = (time) => {
  return `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}:00.000`;
};

function filterDataByName(data, filter) {
  // Create a new object with the same outer structure
  const filteredData = {
    ...data, // Copy all top-level properties
    features: data.features.filter((feature) =>
      filter.includes(feature.properties.NAME_1)
    ), // Filter features
  };
  return filteredData;
}

const MapHome = (props) => {
  const isResponsive = useMediaQuery({ maxWidth: 1150 });

  const dispatch = useDispatch();
  const command = useSelector((store) => store?.newCommand?.command);
  // console.log("🚀 ~ MapHome ~ newCommand:", command);

  const [polygonPaths, setPolygonPaths] = useState([]);
  const [GeoJSONBounds, setGeoJSONBounds] = useState(null);

  // States
  const [step, setStep] = useState(1);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (step === 1) {
      const filteredData = filterDataByName(TunisiaGovernorateGeoJSON, [
        "Ariana",
        "Tunis",
        "BenArous(TunisSud)",
        "Manubah",
      ]);
      setGeoJSONBounds(filteredData);
      if (filteredData?.features?.length > 0) {
        const paths = filteredData?.features?.flatMap((feature) => {
          if (feature.geometry.type === "MultiPolygon") {
            const rewindedFeature = turf.rewind(feature, { reverse: true });
            // Extract all polygons from the MultiPolygon
            return rewindedFeature.geometry.coordinates.flatMap((polygon) => {
              // console.log(
              //   "🚀 ~ returnfeature.geometry.coordinates.flatMap ~ polygon:",
              //   polygon
              // );
              const coords = polygon[0].map((coord) => ({
                lat: coord[1], // Latitude
                lng: coord[0], // Longitude
              }));
              // Close the polygon by adding the first point at the end
              if (coords.length > 0) {
                coords.push(coords[0]);
              }
              return coords;
            });
          }
          return [];
        });
        setPolygonPaths(paths);
      }
    } else if (step === 2) {
      if (TunisiaGeoJSON?.features?.length > 0) {
        setGeoJSONBounds(TunisiaGeoJSON);
        const paths = TunisiaGeoJSON?.features?.flatMap((feature) => {
          if (feature.geometry.type === "MultiPolygon") {
            const rewindedFeature = turf.rewind(feature, { reverse: true });
            // Extract all polygons from the MultiPolygon
            return rewindedFeature.geometry.coordinates.flatMap((polygon) => {
              // console.log(
              //   "🚀 ~ returnfeature.geometry.coordinates.flatMap ~ polygon:",
              //   polygon
              // );
              const coords = polygon[0].map((coord) => ({
                lat: coord[1], // Latitude
                lng: coord[0], // Longitude
              }));
              // Close the polygon by adding the first point at the end
              if (coords.length > 0) {
                coords.push(coords[0]);
              }
              return coords;
            });
          }
          return [];
        });
        setPolygonPaths(paths);
      }
    }
  }, [step]);

  const mapRef = useRef(null);

  const grandTunisBounds = {
    north: 37.5,
    south: 36.3,
    east: 10.6,
    west: 9.5,
  };

  const worldBounds = {
    north: 85,
    south: -85,
    east: 180,
    west: -180,
  };

  const allTunisiaBounds = {
    north: 38.0, // Increased to include a buffer above Tunisia
    south: 29.5, // Decreased to include a buffer below Tunisia
    east: 20.0, // Increased to include a buffer to the east
    west: 3.0, // Decreased to include a buffer to the west
  };

  const setMapBounds = (map, bounds) => {
    const mapBounds = new window.google.maps.LatLngBounds();
    mapBounds.extend({ lat: bounds.north, lng: bounds.east });
    mapBounds.extend({ lat: bounds.south, lng: bounds.west });
    map.fitBounds(mapBounds);
  };

  useEffect(() => {
    if (mapRef.current) {
      if (step === 1) {
        mapRef.current.setOptions({
          restriction: {
            latLngBounds: grandTunisBounds,
            strictBounds: true, // Prevents interactions outside bounds
          },
        });
        // mapRef.current.setZoom(8); // Dynamically set zoom
        const center = {
          lat: (grandTunisBounds.north + grandTunisBounds.south) / 2,
          lng: (grandTunisBounds.east + grandTunisBounds.west) / 2,
        };
        mapRef.current.panTo(center);
      } else if (step === 2) {
        mapRef.current.setOptions({
          restriction: {
            latLngBounds: allTunisiaBounds,
            strictBounds: true, // Prevents interactions outside bounds
          },
        });
        mapRef.current.setZoom(6); // Dynamically set zoom
        const center = {
          lat: (allTunisiaBounds.north + allTunisiaBounds.south) / 2,
          lng: (allTunisiaBounds.east + allTunisiaBounds.west) / 2,
        };
        mapRef.current.panTo(center);
      }
    }
  }, [step]);

  const markerIcon = {
    url: iconMarker, // URL of the departure icon
    scaledSize: new window.google.maps.Size(60, 60), // Size of the icon
    origin: new window.google.maps.Point(0, 0), // Origin of the icon
    anchor: new window.google.maps.Point(30, 60), // Anchor point of the icon
  };

  useEffect(() => {
    if (command.totalPrice) setStep(5);
    dispatch(getAllObjects());
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (command?.pickUpAddress?.coordonne && command?.dropOfAddress?.coordonne)
      calculateVirtualRoute(
        {
          lat: command?.pickUpAddress?.coordonne?.latitude,
          lng: command?.pickUpAddress?.coordonne?.longitude,
        },
        {
          lat: command?.dropOfAddress?.coordonne?.latitude,
          lng: command?.dropOfAddress?.coordonne?.longitude,
        }
      );
  }, [command?.pickUpAddress?.coordonne, command?.dropOfAddress?.coordonne]);

  // Helper functions

  const handleMapClick = async ({ latLng }) => {
    const offsetX = 0.096; // Offset in pixels horizontally
    const offsetY = 0.17; // Offset in pixels vertically

    // Get the current zoom level
    const currentZoom = mapRef.current.getZoom();

    // Get the original coordinates of the click
    // const latLng = event.latLng;

    // Convert the LatLng to pixels
    const projection = mapRef.current.getProjection();
    const point = projection.fromLatLngToPoint(latLng);

    // Apply the offset, scaled by the zoom level
    const adjustedOffsetX =
      offsetX / Math.pow(2, currentZoom - defaultProps.zoom); // Adjust horizontal offset based on zoom
    const adjustedOffsetY =
      offsetY / Math.pow(2, currentZoom - defaultProps.zoom); // Adjust vertical offset based on zoom

    // Apply the offset to the pixel coordinates
    const offsetPoint = {
      x: point.x + adjustedOffsetX,
      y: point.y + adjustedOffsetY,
    };

    // Convert the offset pixels back to LatLng
    const newLatLng = projection.fromPointToLatLng(offsetPoint);

    const lat = newLatLng.lat();
    const lng = newLatLng.lng();

    // const lat = latLng.lat();
    // const lng = latLng.lng();

    const isInsidePolygon = google.maps.geometry.poly.containsLocation(
      new google.maps.LatLng(lat, lng),
      new google.maps.Polygon({ paths: polygonPaths })
    );

    if (!isInsidePolygon) {
      alert(`Selected point is OUTSIDE the polygon: ${lat}, ${lng}`);
      return null;
    }

    try {
      const address = await getAddressFromCoordinates(lat, lng);
      if (step === 1) {
        await new Promise((resolve) => {
          dispatch(
            updatePickUpAddress({
              Address: address,
              coordonne: { latitude: lat, longitude: lng },
            })
          );
          resolve(); // Simulate the "completion" of the dispatch
        });
      } else if (step === 2) {
        await new Promise((resolve) => {
          dispatch(
            updateDropOfAddress({
              Address: address,
              coordonne: { latitude: lat, longitude: lng },
            })
          );
          resolve(); // Simulate the "completion" of the dispatch
        });
      }
    } catch (error) {
      console.error("Error handling map click:", error);
      // Optionally, display an error message to the user
    }
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );

      if (!response.ok) throw new Error("Error fetching geocode");

      const data = await response.json();
      if (data.status !== "OK")
        throw new Error(data.error_message || "Unknown error");

      const formattedAddress =
        data.results[0]?.formatted_address || "Unknown location";
      return formattedAddress;
    } catch (error) {
      console.error("Error in getAddressFromCoordinates:", error);
      return "Error fetching address";
    }
  };

  const calculateVirtualRoute = async (origin, destination) => {
    try {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      // console.log(
      //   "🚀 ~ calculateVirtualRoute ~ results.routes[0].legs[0].distance:",
      //   results.routes[0].legs[0].distance
      // );
      setDirectionsResponse(results);
      dispatch(updateDistance(results.routes[0].legs[0].distance.value));
      // setDistance(results.routes[0].legs[0].distance.text);
      dispatch(updateDuration(results.routes[0].legs[0].duration.text));
      // setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  // if (!isLoaded) return <Loader />;
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    const container = dragContainerRef.current.getBoundingClientRect();
    // Capture the offset between the card and the mouse pointer
    setOffset({
      x: e.clientX - container.left,
      y: e.clientY - container.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const parent =
      dragContainerRef.current.parentElement.getBoundingClientRect();
    // Calculate the new position based on parent boundaries
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMarkerDragEnd = async (markerType, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const address = await getAddressFromCoordinates(lat, lng);

    if (markerType === "pickUp") {
      // setPickUpPosition({ lat, lng });
      dispatch(
        updatePickUpAddress({
          Address: address,
          coordonne: { latitude: lat, longitude: lng },
        })
      );
    } else if (markerType === "dropOff") {
      // setDropOffPosition({ lat, lng });
      dispatch(
        updateDropOfAddress({
          Address: address,
          coordonne: { latitude: lat, longitude: lng },
        })
      );
    }
  };

  return (
    <PlienMap
      ref={props.MapRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {step === 5 && <HighlightOverlay />}
      {/* Map and Controls */}
      <GoogleMap
        // ref={mapRef}
        options={{
          draggableCursor: `url(${iconMarker}), auto`, // Use local custom cursor
          ...(step === 5 && {
            draggable: false, // Disables dragging
            disableDefaultUI: true, // Disables all default controls
            gestureHandling: "none", // Disables all gestures like zooming and panning
            draggableCursor: "default", // Changes cursor to default when hovering over the map
          }),
          // draggingCursor: `url(${iconMarker}), move`, // Use local dragging cursor
        }}
        onLoad={(map) => {
          mapRef.current = map;
          if (step === 10) {
            map.setOptions({
              restriction: {
                latLngBounds: grandTunisBounds,
                strictBounds: true,
              },
            });
          } else if (step === 20) {
            map.setOptions({
              restriction: {
                latLngBounds: allTunisiaBounds,
                strictBounds: true,
              },
            });
          }
        }}
        onClick={handleMapClick}
        className="mapcadre"
        center={{
          lat: isResponsive
            ? defaultProps.center.lat - 0.2
            : defaultProps.center.lat,
          lng: isResponsive
            ? defaultProps.center.lng - 0.1
            : defaultProps.center.lng,
        }}
        zoom={isResponsive ? 9 : defaultProps.zoom}
        mapContainerClassName="mapcadre"
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        {/* <Rectangle
          bounds={worldBounds}
          options={{
            fillColor: "#000000",
            fillOpacity: 0.2,
            strokeColor: "#000000",
            strokeOpacity: 0,
            strokeWeight: 0,
            clickable: false, // Make the overlay non-interactive
            visible: true,
          }}
        /> */}
        {step !== 10 &&
          GeoJSONBounds?.features?.map((feature, index) => {
            // console.log("🚀 ~ {...TunisiaGeoJSON.features.map ~ feature:", feature)
            // Check if the geometry type is MultiPolygon
            if (feature?.geometry?.type === "MultiPolygon") {
              return feature.geometry.coordinates.map(
                (polygon, polygonIndex) => (
                  <Polygon
                    key={`${index}-${polygonIndex}`} // Unique key for each polygon
                    paths={polygon[0].map((coord) => ({
                      lat: coord[1], // Latitude
                      lng: coord[0], // Longitude
                    }))}
                    options={{
                      fillColor: "#FF0000",
                      fillOpacity: 0,
                      strokeColor: "#ff7700",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      zIndex: 99999999,
                      clickable: false,
                      visible: true,
                    }}
                  />
                )
              );
            }

            // Handle other geometry types (e.g., Polygon) if needed
            return null;
          })}

        {command?.pickUpAddress?.coordonne?.latitude && (
          <Marker
            icon={markerIcon}
            key={"departure"}
            position={{
              lat: command?.pickUpAddress?.coordonne?.latitude,
              lng: command?.pickUpAddress?.coordonne?.longitude,
            }}
            draggable
            onDragEnd={(event) => handleMarkerDragEnd("pickUp", event)}
          />
        )}
        {command?.dropOfAddress?.coordonne?.latitude && (
          <Marker
            icon={markerIcon}
            key={"arrived"}
            position={{
              lat: command?.dropOfAddress?.coordonne?.latitude,
              lng: command?.dropOfAddress?.coordonne?.longitude,
            }}
            draggable
            onDragEnd={(event) => handleMarkerDragEnd("dropOff", event)}
          />
        )}
        {/* {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))} */}
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>

      {/* Date and Time Pickers */}
      <GetEstimate
        grandTunisBounds={grandTunisBounds}
        allTunisiaBounds={allTunisiaBounds}
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
        getAddressFromCoordinates={handleMapClick}
      />

      {/* Route Info */}
      {/* {distance && duration && (
        <div>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )} */}
    </PlienMap>
  );
};

const defaultProps = {
  center: {
    lat: 36.800253,
    lng: 10.18617,
  },
  zoom: 8,
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
  background: rgba(70, 70, 70, 0.2); /* Semi-transparent white */
  z-index: 10; /* Ensure it is above the map */
  pointer-events: none; /* Allow map interactions through the overlay */
  // animation: glowEffect 3s infinite; /* Glowing effect */

  // @keyframes glowEffect {
  //   0% {
  //     background: rgba(255, 255, 255, 0.2);
  //   }
  //   50% {
  //     background: rgba(255, 255, 255, 0.4);
  //   }
  //   100% {
  //     background: rgba(255, 255, 255, 0.2);
  //   }
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
    margin-inline: 3vw;

    /* padding: 10px 0 20px; */
    top: -380px;
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
  background-color: #f37a1d;
`;

const DraggableDiv = styled.div`
  width: 150px;
  height: 100px;
  background-color: #f37a1d;
  border-radius: 8px;
  position: absolute;
  cursor: grab;
  user-select: none;
`;
