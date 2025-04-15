import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmcdwdKowpiF_Ap-wqgy5ekKpM_5T8up8",
  authDomain: "kcheck-a4838.firebaseapp.com",
  projectId: "kcheck-a4838",
  storageBucket: "kcheck-a4838.firebasestorage.app",
  messagingSenderId: "278085809987",
  appId: "1:278085809987:web:902e5556edbffab0d361f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);