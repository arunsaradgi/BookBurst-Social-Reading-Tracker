import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            BookBurst
          </Link>
          
          <div className="navbar-links">
            {user ? (
              <>
                <Link to="/bookshelf" className="nav-link">
                  My Bookshelf
                </Link>
                <Link to="/explore" className="nav-link">
                  Explore
                </Link>
                <Link to={`/profile/${user.id}`} className="nav-link">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}