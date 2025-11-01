import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../sections.js/Navbar';
import Footer from '../sections.js/Footer';

const EditeCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    const customDrivers = JSON.parse(localStorage.getItem('customDrivers')) || [];
    const driver = customDrivers.find(d => d.id === parseInt(id));
    if (driver) {
      setFormData({
        name: driver.name,
        description: driver.description,
        image: driver.image
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const customDrivers = JSON.parse(localStorage.getItem('customDrivers')) || [];
    const updatedDrivers = customDrivers.map(driver =>
      driver.id === parseInt(id) ? { ...driver, ...formData } : driver
    );
    localStorage.setItem('customDrivers', JSON.stringify(updatedDrivers));
    alert('Driver card updated successfully!');
    navigate('/our-drivers');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-5">Edit Driver Card</h1>
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
                  <button type="submit" className="btn btn-primary">Update Card</button>
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

export default EditeCard;
