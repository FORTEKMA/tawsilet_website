// import React, { useState } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   DirectionsService,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import PlacesAutocomplete, {
//   geocodeByPlaceId,
// } from "react-google-autocomplete";

// const Form = () => {
//   const [depotAddress, setDepotAddress] = useState(null);
//   const [ramassageAddress, setRamassageAddress] = useState(null);
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);

//   const handleDepotSelect = (place) => {
//     setDepotAddress(place.formatted_address);
//   };

//   const handleRamassageSelect = (place) => {
//     setRamassageAddress(place.formatted_address);
//   };

//   const handleMapLoad = (map) => {
//     setMap(map);
//   };

//   const handleCalculateDistance = () => {
//     if (!depotAddress || !ramassageAddress) {
//       alert("Please enter both addresses.");
//       return;
//     }

//     geocodeByPlaceId(depotAddress.place_id)
//       .then((results) => {
//         const depotLatLng = results[0].geometry.location;

//         geocodeByPlaceId(ramassageAddress.place_id)
//           .then((results) => {
//             const ramassageLatLng = results[0].geometry.location;

//             const directionsService =
//               new window.google.maps.DirectionsService();
//             const origin = depotLatLng;
//             const destination = ramassageLatLng;

//             directionsService.route(
//               {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: window.google.maps.TravelMode.DRIVING,
//               },
//               (result, status) => {
//                 if (status === window.google.maps.DirectionsStatus.OK) {
//                   setDirections(result);
//                 } else {
//                   console.error(`Error fetching directions: ${status}`);
//                 }
//               }
//             );
//           })
//           .catch((error) => {
//             console.error("Error geocoding ramassage address:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error geocoding depot address:", error);
//       });
//   };

//   const containerStyle = {
//     width: "400px",
//     height: "400px",
//   };

//   const center = {
//     lat: 0, // Set initial latitude
//     lng: 0, // Set initial longitude
//   };

//   return (
//     <div>
//       <div>
//         <label>Adresse de Depot:</label>
//         <PlacesAutocomplete
//           apiKey="YOUR_GOOGLE_MAPS_API_KEY"
//           value={depotAddress}
//           onChange={(value) => setDepotAddress(value)}
//           onSelect={handleDepotSelect}
//         />
//       </div>
//       <div>
//         <label>Ramassage Address:</label>
//         <PlacesAutocomplete
//           apiKey="YOUR_GOOGLE_MAPS_API_KEY"
//           value={ramassageAddress}
//           onChange={(value) => setRamassageAddress(value)}
//           onSelect={handleRamassageSelect}
//         />
//       </div>
//       <button onClick={handleCalculateDistance}>Calculate Distance</button>
//       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={10} // Set initial zoom level
//           onLoad={handleMapLoad}
//         >
//           {/* Add map markers for depot and ramassage addresses */}
//           {depotAddress && <Marker position={center} label="Depot" />}
//           {ramassageAddress && <Marker position={center} label="Ramassage" />}

//           {/* Draw a line between depot and ramassage addresses */}
//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 suppressMarkers: true,
//                 polylineOptions: { strokeColor: "blue" },
//               }}
//             />
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Form;
