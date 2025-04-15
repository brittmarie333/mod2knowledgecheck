
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-grid">
        <Link to="/products" className="dashboard-card">Browse Products</Link>
        <Link to="/cart" className="dashboard-card">View Cart</Link>
        <Link to="/orders" className="dashboard-card">Order History</Link>
        <Link to="/profile" className="dashboard-card">Update Profile</Link>
      </div>
    </div>
  );
};

export default Dashboard;
