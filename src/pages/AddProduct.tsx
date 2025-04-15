// src/pages/AddProduct.tsx
import { useState } from 'react';
import { addProduct, updateProduct, ProductData } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ product, onSave }: { product?: ProductData, onSave: () => void }) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [image, setImage] = useState(product?.image || '');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { name, description, price, stock, image };
    
    if (product?.id) {
      // Update existing product
      await updateProduct(product.id, newProduct);
    } else {
      // Add new product
      await addProduct(newProduct);
    }

    onSave();
    navigate('/'); // Redirect to the homepage or products list
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      <label>Stock:</label>
      <input type="number" value={stock} onChange={(e) => setStock(parseInt(e.target.value, 10))} />
      <label>Image URL:</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      <button type="submit">{product ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default AddProduct;
