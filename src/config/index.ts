export const env = {
    // @ts-expect-error - import.meta.env is not typed
    CURRENT: import.meta.env.VITE_APPLIED_ENV,
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
    LOCAL: 'local',
};

export const links = {
    BACKEND: env.CURRENT === env.LOCAL ? 'local-backend' : env.CURRENT === env.DEVELOPMENT ? 'development-backend' : 'production-backend',
    FRONTEND: env.CURRENT === env.LOCAL ? 'local-frontend' : env.CURRENT === env.DEVELOPMENT ? 'development-frontend' : 'production-frontend'
};

export const firebaseConfig = {
  apiKey: "AIzaSyBLvjmSr6veKWXza12BABz9KdhSCz1A4tk",
  authDomain: "sweepsteak-64dd0.firebaseapp.com",
  projectId: "sweepsteak-64dd0",
  storageBucket: "sweepsteak-64dd0.firebasestorage.app",
  messagingSenderId: "230553092247",
  appId: "1:230553092247:web:755825b939a886633ce9d2",
  measurementId: "G-ZB9L5P1S5E"
  };
