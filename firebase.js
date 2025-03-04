import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Replace these with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB2xNGJYnwmy1xzZ2DIxgmYRrBfXqYLQMQ",
  authDomain: "meritland0.firebaseapp.com",
  projectId: "meritland0",
  storageBucket: "meritland0.appspot.com",
  messagingSenderId: "94140762113",
  appId: "1:94140762113:web:2a18be65c319b1fb56d800",
  measurementId: "G-F89FMLTEHF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };

