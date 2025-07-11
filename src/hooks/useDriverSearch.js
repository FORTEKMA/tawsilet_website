import { useRef, useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { ref, push, set, onValue, remove, off, update, get } from 'firebase/database';
import axios from 'axios';

const ONESIGNAL_DRIVER_APP_ID = '87722266-09fa-4a1f-a5f4-e1ef4aefa03d';
const ONESIGNAL_DRIVER_APP_API_KEY = 'os_v2_app_q5zcezqj7jfb7jpu4hxuv35ahxdci3erpime6heocseppjvuztl72dqiaqjukutop3dklgilac3m53leqsvkhnjdc5tkspsarhjlaky';

export const sendNotificationToDrivers = async ({ driver, formData, currentUser }) => {
  // Prepare ride info
  const rideInfo = {
    type: 'new_command',
    from: formData.pickupAddress.address,
    coordonneFrom: {
      longitude: formData.pickupAddress.longitude,
      latitude: formData.pickupAddress.latitude,
    },
    coordonneTo: {
      longitude: formData.dropAddress.longitude,
      latitude: formData.dropAddress.latitude,
    },
    to: formData.dropAddress.address,
    time: formData.time || Date.now(),
    price: formData.price,
    currentUser: {
      id: currentUser.id,
      documentId: currentUser.documentId,
      phoneNumber: currentUser.phoneNumber,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      rating: currentUser.rating,
    },
    distanceBetweenPickupAndDropoff: formData.distance,
    driverPosition: '',
  };

  return axios.post(
    'https://onesignal.com/api/v1/notifications',
    {
      app_id: ONESIGNAL_DRIVER_APP_ID,
      include_aliases: {
        external_id: [String(driver.id)],
      },
      target_channel: 'push',

      "mutable_content": true,
      "android_channel_id": 'ec037fdf-e9b4-4020-babd-181a1dd77ad4',
      "android_accent_color":"0c0c0c",
      "ios_badgeType": "Increase",
      "ios_badgeCount": 1,
      headings: { en: 'Nouveau trajet' },
      contents: {
        en: 'Vous avez une nouvelle demande de course !',
        ar: 'لديك طلب رحلة جديد!',
      },
      mutable_content: true,
      android_channel_id: 'ec037fdf-e9b4-4020-babd-181a1dd77ad4',
      priority: 10,
      data: rideInfo,
    },
    {
      headers: {
        Authorization: `Basic ${ONESIGNAL_DRIVER_APP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const useDriverSearch = ({
  user,
  pickup,
  dropoff,
  vehicleType,
  price,
  time,
  distance,
  onFound,
  onNotFound,
  t,
  onNavigate,
}) => {
  const [searching, setSearching] = useState(false);
  const [maxSearchRadius, setMaxSearchRadius] = useState(null); // <-- new state
  const searchActive = useRef(true);
  const rideRequestRef = useRef(null);
  const rideRequestListenerRef = useRef(null);
  const rideRequestCallbackRef = useRef(null);
  const notifiedDrivers = useRef({});
  const notAccepted = useRef([]);
  const searchTimeout = useRef(null);
  // const MAX_SEARCH_RADIUS = 200; // <-- remove this
  const acceptedRef = useRef(false);
  console.log("maxSearchRadius",maxSearchRadius)
  useEffect(() => {
    // Fetch MAX_SEARCH_RADIUS from API
    const fetchMaxRadius = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/parameters`);
        if (res.data && res.data.data && res.data.data.length > 0) {
          setMaxSearchRadius(res.data.data[0].min_radius_search);
        } else {
          setMaxSearchRadius(200); // fallback
        }
      } catch (e) {
        setMaxSearchRadius(200); // fallback
      }
    };
    fetchMaxRadius();
    return () => {
      searchActive.current = false;
      if (rideRequestListenerRef.current && rideRequestCallbackRef.current) {
        off(rideRequestListenerRef.current, rideRequestCallbackRef.current);
      }
      if (rideRequestRef.current && !acceptedRef.current) remove(rideRequestRef.current);
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  const startSearch = async () => {
    if (maxSearchRadius === null) return; // Wait for radius to be fetched
    setSearching(true);
    searchActive.current = true;
    // 1. Create ride request in Firebase
    const rideRequest = {
      status: 'searching',
      user,
      pickupAddress: {
        "address":pickup.Address,
    "latitude": pickup.coordonne.latitude,
    "longitude": pickup.coordonne.longitude
      },
      dropAddress: {
        "address":dropoff.Address,
    "latitude": dropoff.coordonne.latitude,
    "longitude": dropoff.coordonne.longitude
      },
      vehicleType,
      notifiedDrivers: {},
      price,
      time,
      distance,
      
    };
   

    const reqRef = push(ref(db, 'rideRequests'));
    rideRequestRef.current = reqRef;
    await set(reqRef, rideRequest);

    // 2. Listen for acceptance
    rideRequestListenerRef.current = reqRef;
    rideRequestCallbackRef.current = (snapshot) => {
      const data = snapshot.val();
      if (data && data.status === 'accepted' && searchActive.current) {
        acceptedRef.current = true;
        setSearching(false);
        if (onFound) onFound(data);
        searchActive.current = false;
        if (rideRequestListenerRef.current && rideRequestCallbackRef.current) {
          off(rideRequestListenerRef.current, rideRequestCallbackRef.current);
        }
        if (data.orderId && onNavigate) {
          onNavigate(`/driver/track/${data.orderId}`);
        }
      }
    };
    onValue(reqRef, rideRequestCallbackRef.current);

    // 3. Start progressive search
    progressiveSearch(1, reqRef.key);
  };

  const progressiveSearch = async (radius, orderId) => {
    if (!searchActive.current) return;
    if (maxSearchRadius === null) return; // Wait for radius
    if (radius > maxSearchRadius) {
      setSearching(false);
      const checkAndRemove = async () => {
        const snap = await get(rideRequestRef.current);
        const data = snap.val();
        if (!data || data.status !== 'accepted') {
          if (rideRequestRef.current) remove(rideRequestRef.current);
        }
      };
      checkAndRemove();
      if (onNotFound) onNotFound();
      return;
    }
    let drivers = [];
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/drivers-in-radius`, {
          params: {
            radius: radius,
            latitude: pickup.coordonne.latitude,
            longitude: pickup.coordonne.longitude,
            vehicleType: vehicleType.id,
          },
        }
      );
      drivers = res.data;
    } catch (e) {
      setTimeout(() => progressiveSearch(radius + 1, orderId), 2000);
      return;
    }
    const newDrivers = drivers.filter(
      (d) => !notifiedDrivers.current[d.id] && !notAccepted.current.includes(d.id)
    );
    if (newDrivers.length === 0) {
      setTimeout(() => progressiveSearch(radius + 1, orderId), 2000);
      return;
    }
    for (const driver of newDrivers) {
      if (!searchActive.current) return;
      notifiedDrivers.current[driver.id] = true;
      await update(rideRequestRef.current, { [`notifiedDrivers/${driver.id}`]: true });
      await sendNotificationToDrivers({
        driver,
        formData: {
          pickupAddress: pickup,
          dropAddress: dropoff,
          time,
          price,
          distance,
        },
        currentUser: user,
      });
      await new Promise((resolve) => {
        searchTimeout.current = setTimeout(resolve, 50000);
      });
      const snap = await get(rideRequestRef.current);
      if (snap.val() && snap.val().status === 'accepted') return;
      await update(rideRequestRef.current, { [`notifiedDrivers/${driver.id}`]: false });
      notAccepted.current.push(driver.id);
    }
    progressiveSearch(radius + 1, orderId);
  };

  return { startSearch, searching };
}; 