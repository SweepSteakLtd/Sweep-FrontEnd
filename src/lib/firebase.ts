import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: 'AIzaSyBLvjmSr6veKWXza12BABz9KdhSCz1A4tk',
  authDomain: 'sweepsteak-64dd0.firebaseapp.com',
  projectId: 'sweepsteak-64dd0',
  storageBucket: 'sweepsteak-64dd0.firebasestorage.app',
  messagingSenderId: '230553092247',
  appId: '1:230553092247:web:755825b939a886633ce9d2',
  measurementId: 'G-ZB9L5P1S5E',
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseRemoteConfig = getRemoteConfig(app);
