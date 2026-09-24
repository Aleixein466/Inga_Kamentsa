/* eslint-disable @typescript-eslint/no-explicit-any */
// Firebase init — Proyecto inga-kamentsa (OPCIONAL)
// Consume variables de web/.env.example (.env.local)
// BD canónica: Firestore (inga-kamentsa). Este módulo es 100% opcional: si firebase no está instalado, exporta mocks y no rompe build.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Valida que las env vars críticas estén presentes
export const isFirebaseConfigured =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

if (!isFirebaseConfigured && typeof window !== "undefined") {
  console.warn(
    "[firebase] Faltan variables NEXT_PUBLIC_FIREBASE_* — modo mock activo. Copia web/.env.example -> .env.local"
  );
}

// Singleton opcional: evita re-inicializar en HMR. Usa require dinámico para no romper build si firebase no está instalado.
let app: any = null;
let db: any = null;
let auth: any = null;
let storage: any = null;

if (isFirebaseConfigured) {
  try {
    // eval('require') evita que webpack/next lo resuelva estáticamente si el paquete no existe
    const r: any = eval("require");
    const { initializeApp, getApps, getApp } = r("firebase/app");
    const { getFirestore } = r("firebase/firestore");
    const { getAuth } = r("firebase/auth");
    const { getStorage } = r("firebase/storage");
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (e) {
    console.warn("[firebase] Firebase SDK no instalado o error de init — usando mocks. Ejecuta `npm install` para activar.", e);
    app = null;
    db = null;
    auth = null;
    storage = null;
  }
}

export { app, db, auth, storage };
export default app;
