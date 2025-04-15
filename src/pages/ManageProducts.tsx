// src/pages/ManageProducts.tsx
import { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, ProductData } from '../services/productService';
import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';

const ManageProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const load = async () => {
      const fetched = await getProducts();
      setProducts(fetched);
    };
    load();
  }, []);

  const handleSave = async (product: ProductData) => {
    if (product.id) {
      await updateProduct(product.id, product);
    } else {
      await addProduct(product);
    }
    const updated = await getProducts();
    setProducts(updated);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <ProductForm onSave={handleSave} initialData={editingProduct || undefined} />
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          >
            <button onClick={() => setEditingProduct(product)}>Edit</button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
