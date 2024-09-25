import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@react-native-firebase/app";
import { initializeAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

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
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, db };
