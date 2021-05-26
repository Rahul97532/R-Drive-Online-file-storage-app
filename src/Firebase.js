import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const app = firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })

const app = firebase.initializeApp({
  apiKey: "AIzaSyAePUa0cQQa87kPFblAQ2l7rNm9V0XCxU4",
  authDomain: "gdrive-development-8651a.firebaseapp.com",
  projectId: "gdrive-development-8651a",
  storageBucket: "gdrive-development-8651a.appspot.com",
  messagingSenderId: "774422257504",
  appId: "1:774422257504:web:57a36876c762907f458805",
  measurementId: "G-3TY1DDZNJZ",
});
const firestore = app.firestore();
const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
const auth = app.auth();
const storage = app.storage();
export default app;
export { auth };
export { database };
export { storage };
