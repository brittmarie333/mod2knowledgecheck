import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// register new user and save to firestore
export const registerUser = async (email: string, password: string, name: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    name: name,
    createdAt: new Date()
  });

  return userCredential;
};


export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);


export const logoutUser = () => signOut(auth);
