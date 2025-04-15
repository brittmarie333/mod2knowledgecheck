// src/components/ProductCard.tsx
import { ReactNode } from 'react';
import { ProductData } from '../types/Product';

interface Props {
  product: ProductData;
  onDelete?: (id: string) => void;
  children?: ReactNode;  
}

const ProductCard = ({ product, onDelete, children }: Props) => {
  return (
    <div className="product-card">
      <img
        src={product.image || '/images/default.jpg'}
        alt={product.name}
        width="150"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      {onDelete && (
        <button onClick={() => onDelete(product.id!)}>Delete</button>
      )}
      {children}
    </div>
  );
};

export default ProductCard;
