// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: "AIzaSyCGEe8PLl9cV25vT6-JpnKYsGyi02dmNdY",
//   authDomain: "zestcafe-4edf3.firebaseapp.com",
//   databaseURL: "https://zestcafe-4edf3-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "zestcafe-4edf3",
//   storageBucket: "zestcafe-4edf3.appspot.com",
//   messagingSenderId: "846697396864",
//   appId: "1:846697396864:web:b057a3694099ba42af4465"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;




import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGEe8PLl9cV25vT6-JpnKYsGyi02dmNdY",
  authDomain: "zestcafe-4edf3.firebaseapp.com",
  databaseURL:'https://zestcafe-4edf3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: "zestcafe-4edf3",
  storageBucket: "zestcafe-4edf3.appspot.com",
  messagingSenderId: "846697396864",
  appId: "1:846697396864:web:b057a3694099ba42af4465"   
};

const firebaseStore = firebase.initializeApp(firebaseConfig);
export default firebaseStore