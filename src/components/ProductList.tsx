// src/pages/ProductList.tsx

import { useState, useEffect } from 'react';
import { getProducts, ProductData } from '../services/productService';
import { useCart } from '../context/CartContext'; // Importing useCart to access addToCart

const ProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]); // State to store fetched products
  const { addToCart } = useCart(); // Extracting addToCart from CartContext

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts(); // Fetching products from Firestore
      setProducts(fetchedProducts); // Updating state with fetched products
    };
    loadProducts(); // Calling the function
  }, []);

  return (
    <div>
      <h1>Grounded Collection</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id!} className="product-card">
            <img
              src={product.image || '/default-image.jpg'} // Default image if no image is provided
              alt={product.name}
              width="150"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>

            {/* Add to Cart Button */}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
