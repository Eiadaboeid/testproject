import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MainSec = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [ratings, setRatings] = useState({});
  const [customDrivers, setCustomDrivers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    const savedRatings = localStorage.getItem('driverRatings');
    if (savedRatings) {
      setRatings(JSON.parse(savedRatings));
    }
    const savedCustomDrivers = localStorage.getItem('customDrivers');
    if (savedCustomDrivers) {
      setCustomDrivers(JSON.parse(savedCustomDrivers));
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://www.scania.com/group/en/home/products-and-services/trucks/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid/heroimage.coreimg.85.1200.jpeg/1585221957546/18317-001.jpeg')",
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">GETRUK</h1>
          <p className="hero-description">
            Getruk is a platform for truck drivers to find loads and get paid. We
            are revolutionizing the trucking industry by connecting drivers with
            shippers and brokers. Our platform is designed to be simple and easy
            to use, so you can focus on what you do best - driving.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-content">
          <div className="services-text">
            <h2 className="services-title">Our Services</h2>
            <p className="services-description">
              GETRUK is a platform for truck drivers to find loads and get paid. We
              are revolutionizing the trucking industry by connecting drivers with
              shippers and brokers. Our platform is designed to be simple and easy
              to use, so you can focus on what you do best - driving.
            </p>
          </div>
          <div className="services-image">
            <img
              src="https://www.scania.com/group/en/home/products-and-services/trucks/_jcr_content/root/responsivegrid/responsivegrid_copy/responsivegrid/heroimage.coreimg.85.1200.jpeg/1585221957546/18317-001.jpeg"
              alt="Truck Services"
            />
          </div>
        </div>
      </section>

      {/* Professional Drivers Section */}
      <section className="features-section">
        <h2 className="features-title">Our Professional Drivers</h2>
        <div className="features-grid">
          {customDrivers.filter(driver => (ratings[driver.id] || 0) >= 4).map(driver => (
            <div key={driver.id} className="feature-card">
              <div className="feature-image">
                <img
                  src={driver.image}
                  alt={driver.name}
                />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{driver.name}</h3>
                <p className="feature-description">
                  {driver.description}
                </p>
                <div className="d-flex align-items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star ${index < (ratings[driver.id] || 0) ? 'text-warning' : 'text-muted'}`}
                      style={{ fontSize: '0.8rem' }}
                    ></i>
                  ))}
                  <span className="ms-2" style={{ fontSize: '0.8rem' }}>
                    ({ratings[driver.id] || 0}/5)
                  </span>
                </div>
                {!currentUser ? (
                  <button className="feature-button" onClick={() => {
                    const signUpBtn = document.querySelector('.navbar-nav .btn-link');
                    if (signUpBtn) signUpBtn.click();
                  }}>Sign up to connect</button>
                ) : (
                  <a href={`tel:${driver.phone}`} className="feature-button">Call: {driver.phone}</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainSec;
