import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!user) return alert('You must login to place an order.');

    const order = {
      userId: user.uid,
      items: cartItems.map((item) => ({
        productId: item.id!,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      createdAt: new Date(),
    };

    await placeOrder(order);
    alert('Order placed!');
    clearCart();
    navigate('/dashboard');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image || '/images/default.jpg'}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ${item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id!)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-summary-info">
              <p><strong>Total Items:</strong> {totalQuantity}</p>
              <p><strong>Total Due:</strong> ${total.toFixed(2)}</p>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
