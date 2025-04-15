
import { useState, useEffect } from 'react';
import { ProductData } from '../types/Product';

interface Props {
  onSave: (product: ProductData) => void;
  initialData?: ProductData;
}

const ProductForm = ({ onSave, initialData }: Props) => {
  const [form, setForm] = useState<ProductData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' || name === 'stock' ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: '', description: '', price: 0, stock: 0, image: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit' : 'Add'} Product</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">{initialData ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
