// services/userService.ts
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';


export interface UserProfileData {
  email: string;
  name: string;
  address?: string;
}

export const getUserProfile = async (uid: string): Promise<UserProfileData | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  
  return userDoc.exists() ? (userDoc.data() as UserProfileData) : null;
};

export const updateUserProfile = async (uid: string, data: { name?: string; address?: string }) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
};

export const deleteUserProfile = async (uid: string) => {
  await deleteDoc(doc(db, 'users', uid));
};
