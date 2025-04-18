import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ searchText, setSearchText }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const u = localStorage.getItem('user');
        setUser(u);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <div className="nav-brand">
                        <Link to="/" className="logo">Task Manager</Link>
                    </div>

                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                        <ul className="nav-list">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>

                            {user ? (
                                <li className="nav-item">
                                    <button
                                        className="nav-link logout-btn"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        {user && (
                            <div className="search-container">
                                <input
                                    type="search"
                                    className="search-input"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search tasks..."
                                />
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;