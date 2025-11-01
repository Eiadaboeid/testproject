import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import logo from '../logo.svg';
import SignUp from '../auth.js/SignUp';
import SignIn from '../auth.js/SignIn';

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const defaultDrivers = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Davis' },
    { id: 4, name: 'Emily Wilson' },
    { id: 5, name: 'David Brown' },
    { id: 6, name: 'Lisa Garcia' }
  ];

  const [customDrivers, setCustomDrivers] = useState([]);

  useEffect(() => {
    const savedCustomDrivers = localStorage.getItem('customDrivers');
    if (savedCustomDrivers) {
      setCustomDrivers(JSON.parse(savedCustomDrivers));
    }
  }, []);

  const allDrivers = [...defaultDrivers, ...customDrivers];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    alert('Logged out successfully');
  };

  const handleAuthSuccess = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    setShowSignUp(false);
    setShowSignIn(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = allDrivers.filter(driver =>
        driver.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (driverName) => {
    setSearchQuery(driverName);
    setShowSuggestions(false);
    navigate(`/our-drivers?search=${encodeURIComponent(driverName)}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.position-relative')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/our-drivers?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/our-drivers');
    }
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger text-primary sticky-top" style={{ backgroundColor: 'var(--navbar-bg)' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSQFca802PyAMIiW6kuPE__AdJDj3oUeVxeg&s' alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
            Navbar
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/our-drivers">Our Drivers</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/favorite-drivers">Favorite Drivers</Link>
                  </li>
                </>
              )}
              {currentUser && (currentUser.userType === 'business' || currentUser.userType === 'admin') && (
                <li className="nav-item">
                  <Link className="nav-link" to="/create-card">Create Card</Link>
                </li>
              )}
              {!currentUser ? (
                <>
                  <li className="nav-item">
                    <button className="nav-link active btn btn-link" onClick={handleSignUpClick}>Sign Up</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link active btn btn-link" onClick={handleSignInClick}>Sign In</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link active btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              )}
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={toggleTheme} style={{ fontSize: '1.2rem' }}>
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </li>
            </ul>
            {currentUser && (
              <div className="position-relative">
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search drivers by name"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                    {suggestions.map(driver => (
                      <li
                        key={driver.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSuggestionClick(driver.name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {driver.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {showSignUp && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button type="button" className="close" onClick={handleCloseSignUp}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SignUp onSuccess={handleAuthSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showSignIn && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign In</h5>
                <button type="button" className="close" onClick={handleCloseSignIn}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SignIn onSuccess={handleAuthSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}
      {(showSignUp || showSignIn) && <div className="modal-backdrop show"></div>}
    </>
  );
};

export default Navbar;
