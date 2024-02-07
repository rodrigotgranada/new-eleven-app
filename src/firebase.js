// import firebase from "firebase/app"
// import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBE5qjnaa7XlpOoIEhala-aN1tWMsVaRYI",
//   authDomain: "new-eleven-app.firebaseapp.com",
//   projectId: "new-eleven-app",
//   storageBucket: "new-eleven-app.appspot.com",
//   messagingSenderId: "191714423135",
//   appId: "1:191714423135:web:21e374ad39e726c020c6ea",
//   measurementId: "G-C7WEHC9D15",
// };

// ------------------ PRODUCTION ------------------

const firebaseConfig = {
  apiKey: "AIzaSyAqVAZRCEyM2E6fYvfYUVr8CBu8zK0TuKo",
  authDomain: "eleven-bb625.firebaseapp.com",
  databaseURL: "https://eleven-bb625-default-rtdb.firebaseio.com",
  projectId: "eleven-bb625",
  storageBucket: "eleven-bb625.appspot.com",
  messagingSenderId: "818258144821",
  appId: "1:818258144821:web:4d3c6dca43094358b38b7c",
  measurementId: "G-QRJDR3CX0J",
};

// ------------------ DEVELOPMENT ------------------

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyCpEt8dLR_UNd4BjuYUe_RdV0wtMSJv4a8",
//   authDomain: "safrasecifras-cdef2.firebaseapp.com",
//   projectId: "safrasecifras-cdef2",
//   storageBucket: "safrasecifras-cdef2.appspot.com",
//   messagingSenderId: "849362127346",
//   appId: "1:849362127346:web:a1c4aad43acaffdb25c36b",
//   measurementId: "G-CHMM2RDW41"
// })

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbReal = getDatabase(app);
export const storage = getStorage(app);
// export const auth = app.auth()
export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAqVAZRCEyM2E6fYvfYUVr8CBu8zK0TuKo",
//   authDomain: "eleven-bb625.firebaseapp.com",
//   databaseURL: "https://eleven-bb625-default-rtdb.firebaseio.com",
//   projectId: "eleven-bb625",
//   storageBucket: "eleven-bb625.appspot.com",
//   messagingSenderId: "818258144821",
//   appId: "1:818258144821:web:4d3c6dca43094358b38b7c",
//   measurementId: "G-QRJDR3CX0J"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
