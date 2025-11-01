import React, { useState } from 'react';

const SignIn = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('User signed in:', user);
        setSuccessMessage('Sign in successful!');
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000); // Delay navigation to show the message
      } else {
        alert('Invalid email or password');
      }
    }
  };

  return (
    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : formData.email ? 'is-valid' : ''}`}
          id="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : formData.password ? 'is-valid' : ''}`}
          id="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <small className="form-text text-muted">
          Password must be at least 8 characters and contain uppercase, lowercase, and number.
        </small>
        <div className="valid-feedback">Looks good!</div>
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button className="btn btn-primary" type="submit">Sign In</button>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
    </form>
  );
};

export default SignIn;
