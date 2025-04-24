
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4" style={{ maxWidth: '600px'}}>
      <h1 className="text-center mb-4">Welcome to Grounded!</h1>
      <h4>Grounded keeps your flow fresh — stylish yoga + Pilates wear and water bottles that move with you. Feel good, look good, hydrate often.</h4>

      <div id="homeCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/homeimage1.jpg" className="d-block w-100" alt="Promo 1" />
          </div>
          <div className="carousel-item">
            <img src="/homeimage2.jpg" className="d-block w-100" alt="Promo 2" />
          </div>
          <div className="carousel-item">
            <img src="/homeimage3.jpg" className="d-block w-100" alt="Promo 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="text-center">
        {!user ? (
          <>
            <p>Join us and start shopping today!</p>
            <Link className="btn btn-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-secondary" to="/register">Register</Link>
          </>
        ) : (
          <>
            <p>Welcome back, {user.email}!</p>
            <Link className="btn btn-success" to="/dashboard">Go to Dashboard</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
