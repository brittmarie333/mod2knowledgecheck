import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { OrderData } from '../types/Order';


export const placeOrder = async (order: Omit<OrderData, 'id'>) => {
  const orderWithTimestamp = {
    ...order,
    createdAt: Timestamp.fromDate(order.createdAt),
  };
  await addDoc(collection(db, 'orders'), orderWithTimestamp);
};

// fetch all orders for a SPECIFIC user 
export const getUserOrders = async (userId: string): Promise<OrderData[]> => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<OrderData, 'id'>),
    createdAt: doc.data().createdAt.toDate(), // convert firestore timestamp to date
  }));
};
