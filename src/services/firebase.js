import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAsW4Gvh8L997VHV2B1Nmqc6Ix8Jo_mL0c',
  authDomain: 'tawsiletdriver.firebaseapp.com',
  databaseURL: 'https://tawsiletdriver-default-rtdb.firebaseio.com',
  projectId: 'tawsiletdriver',
  storageBucket: 'tawsiletdriver.firebasestorage.app',
  messagingSenderId: '960462603456',
  appId: '1:960462603456:web:ebc532fa8d4615615bd925',
  measurementId: 'G-C692GBZGP7',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }; 