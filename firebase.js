import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-3xDF9STSpmexIkl7o0pmjY7cPu-W5wc",
  authDomain: "vibe-hotspot-new.firebaseapp.com",
  projectId: "vibe-hotspot-new",
  storageBucket: "vibe-hotspot-new.appspot.com",
  messagingSenderId: "534268671571",
  appId: "1:534268671571:web:92453f88a85477cdcd78a6",
  measurementId: "G-TFR97L9DT1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: browserSessionPersistence,
});

export { app, auth, db };
