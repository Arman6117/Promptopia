// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDepIlDjX5TggtAF_5XG-t2wZ1SSbHqi2w",
  authDomain: "promptopia-cbbbe.firebaseapp.com",
  projectId: "promptopia-cbbbe",
  storageBucket: "promptopia-cbbbe.appspot.com",
  messagingSenderId: "116342570331",
  appId: "1:116342570331:web:4e2c2633badcf23d6bae7e"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth  = getAuth(app)
// const provider = new GoogleAuthProvider()
// const db = getFirestore(app)
export {firebaseConfig}