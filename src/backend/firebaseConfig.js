import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics"; // Tambahkan isSupported

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA-gedRC3YG5N7PtIETBz_kiUgz78Rg9Uw",
  authDomain: "tescrud-f736c.firebaseapp.com",
  projectId: "tescrud-f736c",
  storageBucket: "tescrud-f736c.appspot.com",
  messagingSenderId: "420191226525",
  appId: "1:420191226525:web:72c6607ce714beee26a274",
  measurementId: "G-LSL1JG0FDK",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inisialisasi Firestore

// Inisialisasi Analytics hanya jika didukung
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app); // Hanya inisialisasi jika didukung
  }
});

// Ekspor db untuk digunakan di tempat lain
export { db };
