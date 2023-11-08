// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
// import { firebase } from '@react-native-firebase/auth';

import { initializeApp } from 'firebase/app';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-3xDF9STSpmexIkl7o0pmjY7cPu-W5wc",
  authDomain: "vibe-hotspot-new.firebaseapp.com",
  projectId: "vibe-hotspot-new",
  storageBucket: "vibe-hotspot-new.appspot.com",
  messagingSenderId: "534268671571",
  appId: "1:534268671571:web:92453f88a85477cdcd78a6",
  measurementId: "G-TFR97L9DT1"
};


const app = initializeApp(firebaseConfig);

export default app;