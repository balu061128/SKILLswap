import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBmlUFZBGZIbC0J0gMRpRyZKgKkCYVqMiU",
  authDomain: "studio-4614444882-36f96.firebaseapp.com",
  projectId: "studio-4614444882-36f96",
  storageBucket: "studio-4614444882-36f96.appspot.com",
  messagingSenderId: "264400307466",
  appId: "1:264400307466:web:4b60e52424a98e4826e6f3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
