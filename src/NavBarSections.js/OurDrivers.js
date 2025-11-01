import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../sections.js/Navbar';
import Footer from '../sections.js/Footer';

const OurDrivers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [customDrivers, setCustomDrivers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedCustomDrivers = localStorage.getItem('customDrivers');
    if (savedCustomDrivers) {
      setCustomDrivers(JSON.parse(savedCustomDrivers));
    }
  }, []);

  const drivers = React.useMemo(() => customDrivers, [customDrivers]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('driverFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    const savedRatings = localStorage.getItem('driverRatings');
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) {
      const filtered = drivers.filter(driver =>
        driver.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [location.search, drivers]);

  const toggleFavorite = (driverId) => {
    const newFavorites = favorites.includes(driverId)
      ? favorites.filter(id => id !== driverId)
      : [...favorites, driverId];
    setFavorites(newFavorites);
    localStorage.setItem('driverFavorites', JSON.stringify(newFavorites));
  };

  const rateDriver = (driverId, rating) => {
    const newRatings = {
      ...ratings,
      [driverId]: rating
    };
    setRatings(newRatings);
    localStorage.setItem('driverRatings', JSON.stringify(newRatings));
  };

  const deleteDriver = (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver card?')) {
      const existingDrivers = JSON.parse(localStorage.getItem('customDrivers')) || [];
      const updatedDrivers = existingDrivers.filter(driver => driver.id !== driverId);
      localStorage.setItem('customDrivers', JSON.stringify(updatedDrivers));
      setCustomDrivers(updatedDrivers);
      // Also remove from favorites if favorited
      const newFavorites = favorites.filter(id => id !== driverId);
      setFavorites(newFavorites);
      localStorage.setItem('driverFavorites', JSON.stringify(newFavorites));
      // Remove ratings
      const newRatings = { ...ratings };
      delete newRatings[driverId];
      setRatings(newRatings);
      localStorage.setItem('driverRatings', JSON.stringify(newRatings));
    }
  };



  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-5">Our Drivers</h1>
            <div className="row">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map(driver => (
                  <div key={driver.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <img
                        src={driver.image}
                        className="card-img-top"
                        alt={driver.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{driver.name}</h5>
                        <p className="card-text flex-grow-1">{driver.description}</p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div>
                            <button className="btn btn-primary me-2" onClick={() => window.location.href = `tel:${driver.phone || '+1-555-0000'}`}>Connect</button>
                            {currentUser && (currentUser.userType === 'business' || currentUser.userType === 'admin' || currentUser.email === 'admin@gmail.com') && (
                              <>
                                <button
                                  className="btn btn-secondary me-2"
                                  onClick={() => navigate(`/edit-card/${driver.id}`)}
                                >
                                  Edit
                                </button>
                                {(currentUser.userType === 'admin' || currentUser.email === 'admin@gmail.com') && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteDriver(driver.id)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="me-2">
                              {[...Array(5)].map((_, index) => (
                                <button
                                  key={index}
                                  className="btn btn-link p-0 me-1"
                                  onClick={() => rateDriver(driver.id, index + 1)}
                                  style={{ fontSize: '1rem' }}
                                >
                                  <i className={`fas fa-star ${(ratings[driver.id] || 0) > index ? 'text-warning' : 'text-muted'}`}></i>
                                </button>
                              ))}
                            </div>
                            <button
                              className="btn btn-link p-0"
                              onClick={() => toggleFavorite(driver.id)}
                              style={{ fontSize: '1.5rem' }}
                            >
                              <i className={`fas fa-heart ${favorites.includes(driver.id) ? 'text-danger' : 'text-muted'}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p>No drivers found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurDrivers;
