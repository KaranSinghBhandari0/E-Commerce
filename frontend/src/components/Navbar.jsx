import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useContext } from 'react';
import '../css/navbar.css';

export default function Navbar() {
    const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='nav-parent'>
            {/* Navbar for big screens >=540px width */}
            <nav className='nav-big'>
                <a href="/" className="navbar-brand">
                    <img src={logo} className='logo' alt="Logo" />
                    <span>E-commerce</span>
                </a>
                <div className='nav-links'>
                    <Link to="/cart" className="btn btn-warning">
                        Cart 
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <div className="btn-group">
                        <button type="button" className='user-icon' data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-circle-user" style={{fontSize:"1.7rem", color: "white"}}></i>
                        </button>
                        <ul className="dropdown-menu">
                            {!isAuthenticated() ? (
                                <>
                                    <li>
                                        <Link to="/signup" className="dropdown-item">SignUp</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="dropdown-item">Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {isAdmin && (
                                        <li>
                                            <Link to="/newProduct" className="dropdown-item">Add New</Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link to={'/login'} className="dropdown-item" onClick={handleLogout}>
                                            <i className="fa-solid fa-right-from-bracket" style={{fontSize:'20px'}}></i> Logout
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/orders'} className="dropdown-item">Orders</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Navbar for small screens <540px width */}
            <nav className='nav-small'>
                <Link to="/"><i className="fa-solid fa-house"></i></Link>
                <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                <div className="btn-group">
                    <button type="button" className='user-icon' data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user" style={{fontSize:"1.2rem", color: "white"}}></i>
                    </button>
                    <ul className="dropdown-menu">
                        {!isAuthenticated() ? (
                            <>
                                <li>
                                    <Link to="/signup" className="dropdown-item">SignUp</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="dropdown-item">Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <li>
                                        <Link to="/newProduct" className="dropdown-item">Add New</Link>
                                    </li>
                                )}
                                <li>
                                    <Link to={'/login'} className="dropdown-item" onClick={handleLogout}>
                                        <i className="fa-solid fa-right-from-bracket" style={{fontSize:'20px'}}></i> Logout
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/orders'} className="dropdown-item">Orders</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <Link to="/settings">
                    <i className="fa-solid fa-gear"></i>
                </Link>
            </nav>
        </div>
    );
}
