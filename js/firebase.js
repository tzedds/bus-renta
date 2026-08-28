import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyAh9SyBcWOZBnuToYwIhN__BCSDUUZp-VY",
authDomain: "bus-rent-dav.firebaseapp.com",
projectId: "bus-rent-dav",
storageBucket: "bus-rent-dav.firebasestorage.app",
messagingSenderId: "97727389316",
appId: "1:97727389316:web:27d88380fe062e83a72cd1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);