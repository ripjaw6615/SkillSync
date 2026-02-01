import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ THIS LINE WAS MISSING

const firebaseConfig = {
  apiKey: "AIzaSyDNOGfcRfMLzaZFwDYTrWiZ5TLDG1dheXs",
  authDomain: "iitr-skill-hub.firebaseapp.com",
  projectId: "iitr-skill-hub",
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT BOTH
export const auth = getAuth(app);
export const db = getFirestore(app);
