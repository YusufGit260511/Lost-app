import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEsmsRezjzAOF6O-EsNiwRmN7JNasiojg",
  authDomain: "telegram-504ae.firebaseapp.com",
  projectId: "telegram-504ae",
  storageBucket: "telegram-504ae.appspot.com",
  messagingSenderId: "239392068847",
  appId: "1:239392068847:web:e8ad4f8a4ef5ead26c771a",
  measurementId: "G-R9C8WRHHK8"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

try {
  getAnalytics(app);
} catch (e) {
  console.warn("Analytics не инициализирован", e);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;