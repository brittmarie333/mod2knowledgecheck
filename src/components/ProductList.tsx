
import { useState, useEffect } from 'react';
import { getProducts, ProductData } from '../services/productService';
import { useCart } from '../context/CartContext'; 

const ProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { addToCart } = useCart(); 

  // fetch products from firestore once mounted
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts); 
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h1>Grounded Collection</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id!} className="product-card">
            <img
              src={product.image || '/default-image.jpg'} 
              alt={product.name}
              width="150"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p></p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
