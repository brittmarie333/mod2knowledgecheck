
import { useEffect, useState } from 'react';
import { getUserOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import { OrderData } from '../types/Order';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="order-history-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h4>Order ID: {order.id}</h4>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <ul className="order-items">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} — Qty: {item.quantity} @ ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
