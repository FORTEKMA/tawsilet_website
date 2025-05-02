export const filterDataByName = (data, filter) => {
  // Create a new object with the same outer structure
  const filteredData = {
    ...data, // Copy all top-level properties
    features: data.features.filter((feature) =>
      filter.includes(feature.properties.NAME_1)
    ), // Filter features
  };
  return filteredData;
};

export const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address|route|locality|administrative_area_level_1&key=${apiKey}`
    );
    
    if (!response.ok) throw new Error("Error fetching geocode");
    const data = await response.json();
    
    if (data.status !== "OK") {
      throw new Error(data.error_message || "Unknown error");
    }

    if (!data.results.length) return "Unknown location";

    const addressComponents = data.results[0].address_components;
    
    // Extract components with filtering
    let streetNumber = '';
    let route = '';
    let locality = '';
    let adminArea1 = '';
    let adminArea2 = '';
    let country = '';

    for (const component of addressComponents) {
      if (component.types.includes('street_number')) {
        streetNumber = component.long_name;
      }
      if (component.types.includes('route')) {
        // Skip "Route Sans Nom" and similar unnamed routes
        const routeName = component.long_name;
        if (!/Sans Nom|Unnamed Road/i.test(routeName)) {
          route = routeName;
        }
      }
      if (component.types.includes('locality')) {
        locality = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        adminArea1 = component.long_name;
      }
      if (component.types.includes('administrative_area_level_2')) {
        adminArea2 = component.long_name;
      }
      if (component.types.includes('country')) {
        country = component.long_name;
      }
    }

    // Build address parts hierarchy
    const addressParts = [];
    
    if (streetNumber) addressParts.push(streetNumber);
    if (route) addressParts.push(route);
    
    // Use the most specific administrative area first
    if (adminArea2 && adminArea2 !== locality) addressParts.push(adminArea2);
    if (locality) addressParts.push(locality);
    if (adminArea1 && adminArea1 !== locality) addressParts.push(adminArea1);
    if (country) addressParts.push(country);

    // Create final address
    let finalAddress = addressParts.join(', ');

    // Fallback to formatted_address with cleanup
    if (!finalAddress) {
      finalAddress = data.results[0].formatted_address
        .replace(/^\w+\+\w+\s/, '')  // Remove plus codes
        .replace(/Route Sans Nom,\s*/i, ''); // Remove "Route Sans Nom"
    }

    // Clean duplicate names (e.g., "Tunis, Tunis, Tunisia" → "Tunis, Tunisia")
    finalAddress = finalAddress.replace(
      /(\b\w+\b)(, \1)+/g, 
      (match, group) => group
    );

    return finalAddress.trim() || "Unknown location";

  } catch (error) {
    console.error("Error in getAddressFromCoordinates:", error);
    return "Error fetching address";
  }
};