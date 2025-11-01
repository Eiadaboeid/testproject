import React, { useState } from 'react';

const SignUp = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    state: '',
    zip: '',
    userType: 'personal',
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    validateField(name);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name);
  };

  const validateField = (name) => {
    let error = null;
    switch (name) {
      case 'firstName':
        if (!formData.firstName.trim()) {
          error = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
          error = 'First name must be at least 2 characters';
        }
        break;
      case 'lastName':
        if (!formData.lastName.trim()) {
          error = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
          error = 'Last name must be at least 2 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!formData.password) {
          error = 'Password is required';
        } else if (formData.password.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!passwordRegex.test(formData.password)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
      case 'city':
        if (!formData.city.trim()) {
          error = 'City is required';
        } else if (formData.city.trim().length < 2) {
          error = 'City must be at least 2 characters';
        }
        break;
      case 'state':
        if (!formData.state.trim()) {
          error = 'State is required';
        } else if (formData.state.trim().length < 2) {
          error = 'State must be at least 2 characters';
        }
        break;
      case 'zip':
        const zipRegex = /^\d{4}$/;
        if (!formData.zip.trim()) {
          error = 'Zip code is required';
        } else if (!zipRegex.test(formData.zip.trim())) {
          error = 'Please enter a valid zip code (4 digits)';
        }
        break;
      case 'agree':
        if (!formData.agree) {
          error = 'You must agree to terms and conditions';
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

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

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (formData.state.trim().length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    }

    // Zip validation
    const zipRegex = /^\d{4}$/;
    if (!formData.zip.trim()) {
      newErrors.zip = 'Zip code is required';
    } else if (!zipRegex.test(formData.zip.trim())) {
      newErrors.zip = 'Please enter a valid zip code (4 digits)';
    }

    // Agreement validation
    if (!formData.agree) {
      newErrors.agree = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Generate a simple token
      const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
      const user = { ...formData, token, notifications: true };
      // Save to localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('User signed up:', user);
      alert('Sign up successful! Token: ' + token);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">First name</label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? 'is-invalid' : formData.firstName && !errors.firstName ? 'is-valid' : ''}`}
            id="validationCustom01"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.firstName && errors.firstName && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.firstName}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom02">Last name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : formData.lastName && !errors.lastName ? 'is-valid' : ''}`}
            id="validationCustom02"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.lastName && errors.lastName && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.lastName}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustomEmail">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : formData.email && !errors.email ? 'is-valid' : ''}`}
            id="validationCustomEmail"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="validationCustomPassword">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : formData.password && !errors.password ? 'is-valid' : ''}`}
            id="validationCustomPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Password must be at least 8 characters and contain uppercase, lowercase, and number.
          </div>
          {touched.password && errors.password && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="validationCustom03">City</label>
          <input
            type="text"
            className={`form-control ${errors.city ? 'is-invalid' : formData.city && !errors.city ? 'is-valid' : ''}`}
            id="validationCustom03"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.city && errors.city && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.city}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="validationCustom04">State</label>
          <input
            type="text"
            className={`form-control ${errors.state ? 'is-invalid' : formData.state && !errors.state ? 'is-valid' : ''}`}
            id="validationCustom04"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.state && errors.state && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.state}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="validationCustom05">Zip</label>
          <input
            type="text"
            className={`form-control ${errors.zip ? 'is-invalid' : formData.zip && !errors.zip ? 'is-valid' : ''}`}
            id="validationCustom05"
            placeholder="Zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.zip && errors.zip && <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.zip}</div>}
          <div className="valid-feedback">Looks good!</div>
        </div>
      </div>
      <div className="form-group mb-3">
        <label>User Type</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="userType"
            id="personalUser"
            value="personal"
            checked={formData.userType === 'personal'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="personalUser">
            Personal User
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="userType"
            id="businessUser"
            value="business"
            checked={formData.userType === 'business'}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="businessUser">
            Business User
          </label>
        </div>
      </div>
      <div className="form-group">
        <div className="form-check">
          <input
            className={`form-check-input ${errors.agree ? 'is-invalid' : formData.agree ? 'is-valid' : ''}`}
            type="checkbox"
            value=""
            id="invalidCheck"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            Agree to terms and conditions
          </label>
          <div className="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Submit form</button>
    </form>
  );
};

export default SignUp;
