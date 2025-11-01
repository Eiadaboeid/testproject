import React, { useState } from 'react';
import Navbar from '../sections.js/Navbar';
import Footer from '../sections.js/Footer';

const CreatCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get existing custom drivers from localStorage
    const existingDrivers = JSON.parse(localStorage.getItem('customDrivers')) || [];
    // Create new driver with unique id
    const newDriver = {
      id: Date.now(), // Simple unique id
      name: formData.name,
      description: formData.description,
      image: formData.image,
      phone: formData.phone
    };
    // Add to existing drivers
    const updatedDrivers = [...existingDrivers, newDriver];
    // Save to localStorage
    localStorage.setItem('customDrivers', JSON.stringify(updatedDrivers));
    alert('Driver card created successfully!');
    // Reset form
    setFormData({
      name: '',
      description: '',
      image: '',
      phone: ''
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-5">Create New Driver Card</h1>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Driver Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1-555-123-4567"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Create Card</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatCard;
