
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
}

//fetch products
export const getProducts = async (): Promise<ProductData[]> => {
  const snapshot = await getDocs(collection(db, 'products'));
  const products: ProductData[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as Omit<ProductData, 'id'>;
    products.push({ id: doc.id, ...data });
  });

  return products;
};

//add product
export const addProduct = async (product: ProductData) => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
};

export const updateProduct = async (id: string, updatedProduct: ProductData) => {
  const productRef = doc(db, 'products', id);


  await updateDoc(productRef, {
    name: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price,
    stock: updatedProduct.stock,
    image: updatedProduct.image
  });
};

//delete product
export const deleteProduct = async (id: string) => {
  const productRef = doc(db, 'products', id);
  await deleteDoc(productRef);
};
