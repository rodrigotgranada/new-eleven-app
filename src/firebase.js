// import firebase from "firebase/app"
// import "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBE5qjnaa7XlpOoIEhala-aN1tWMsVaRYI",
  authDomain: "new-eleven-app.firebaseapp.com",
  projectId: "new-eleven-app",
  storageBucket: "new-eleven-app.appspot.com",
  messagingSenderId: "191714423135",
  appId: "1:191714423135:web:21e374ad39e726c020c6ea",
  measurementId: "G-C7WEHC9D15",
};

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
