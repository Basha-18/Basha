import React, { useState } from 'react';
import './App.css';

const RegistrationForm = () => {
  const initialRegistrationFormData = {
    firstName: '',
    lastName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    rollNumber: '',
    collegeName: '',
    branch: '',
    yearStart: '',
    yearEnd: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  };

  const initialLoginForm = {
    loginIdentifier: '', // New field for login form
    loginPassword: '',   // New field for login form
  };

  const [registrationFormData, setRegistrationFormData] = useState(initialRegistrationFormData);
  const [loginFormData, setLoginFormData] = useState(initialLoginForm);
  const [formErrors, setFormErrors] = useState({});
  const [showLoginForm, setShowLoginForm] = useState(false);

  const requiredFields = [
    'firstName', 'lastName', 'fatherName', 'motherName', 'dateOfBirth',
    'rollNumber', 'collegeName', 'branch', 'yearStart', 'yearEnd',
    'mobileNumber', 'email', 'password', 'confirmPassword'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure mobileNumber input only accepts numeric values
    if (name === 'mobileNumber' && !/^\d*$/.test(value)) {
      return; // Return early if the input is not numeric
    }

    setRegistrationFormData({ ...registrationFormData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (showLoginForm) {
      validateLoginForm(errors);
    } else {
      validateRegistrationForm(errors);
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (showLoginForm) {
        console.log('Login Form submitted:', loginFormData);
        setLoginFormData(initialLoginForm);
      } else {
        console.log('Registration Form submitted:', registrationFormData);
        setRegistrationFormData(initialRegistrationFormData);
      }
    }
  };

  const validateRegistrationForm = (errors) => {
    requiredFields.forEach(field => {
      if (!registrationFormData[field]) {
        errors[field] = `${getFieldLabel(field)} is required`;
      }
    });

    if (registrationFormData.email && !/\S+@\S+\.\S+/.test(registrationFormData.email)) {
      errors.email = 'Email is invalid';
    }

    if (registrationFormData.password.length < 8 || registrationFormData.password.length > 15) {
      errors.password = 'Password must be between 8 and 15 characters';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(registrationFormData.password)) {
      errors.password = 'Password must contain at least one special character';
    }

    if (registrationFormData.password !== registrationFormData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  };

  const validateLoginForm = (errors) => {
    if (!loginFormData.loginIdentifier) {
      errors.loginIdentifier = 'Please enter your Name, Email, or Roll Number';
    }

    if (!loginFormData.loginPassword) {
      errors.loginPassword = 'Please enter your Password';
    }
  };

  const getFieldLabel = (fieldName) => ({
    firstName: 'First Name',
    lastName: 'Last Name',
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    dateOfBirth: 'Date of Birth',
    rollNumber: 'Roll Number',
    collegeName: 'College Name',
    branch: 'Branch',
    yearStart: 'Year of Starting',
    yearEnd: 'Year of Ending',
    mobileNumber: 'Mobile Number',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginIdentifier: 'Name, Email, or Roll Number', // Placeholder for login form
    loginPassword: 'Password', // Placeholder for login form
  }[fieldName]);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className='form-container'>
      {!showLoginForm && (
        <div className="registration-form">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            {requiredFields.map(field => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{getFieldLabel(field)}</label>
                {field === 'dateOfBirth' || field === 'yearStart' || field === 'yearEnd' ? (
                  <input
                    type="date"
                    id={field}
                    name={field}
                    value={registrationFormData[field]}
                    onChange={handleChange}
                    className={formErrors[field] ? 'form-control error' : 'form-control'}
                    required
                  />
                ) : field === 'password' || field === 'confirmPassword' ? (
                  <input
                    type="password"
                    id={field}
                    name={field}
                    value={registrationFormData[field]}
                    onChange={handleChange}
                    className={formErrors[field] ? 'form-control error' : 'form-control'}
                    required={field !== 'branch'}
                  />
                ) : field === 'branch' ? (
                  <select
                    id={field}
                    name={field}
                    value={registrationFormData[field]}
                    onChange={handleChange}
                    className={formErrors[field] ? 'form-control error' : 'form-control'}
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="cse">Computer Science and Engineering (CSE)</option>
                    <option value="aits">Artificial Intelligence and Technology Solutions (AITS)</option>
                    <option value="aiml">Artificial Intelligence and Machine Learning (AIML)</option>
                    <option value="mech">Mechanical Engineering (Mech)</option>
                    <option value="ce">Civil Engineering (CE)</option>
                  </select>
                ) : field === 'mobileNumber' ? (
                  <input
                    type='number'
                    id={field}
                    name={field}
                    placeholder={getFieldLabel(field)}
                    value={registrationFormData[field]}
                    onChange={handleChange}
                    className={formErrors[field] ? 'form-control error' : 'form-control'}
                    required
                  />
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    placeholder={getFieldLabel(field)}
                    value={registrationFormData[field]}
                    onChange={handleChange}
                    className={formErrors[field] ? 'form-control error' : 'form-control'}
                    required={field !== 'branch'}
                  />
                )}
                {formErrors[field] && <span className="error-message">{formErrors[field]}</span>}
              </div>
            ))}
            <button type="submit" className="submit-btn">Register</button>
          </form>
          <p>Already have an account? <button onClick={toggleLoginForm}>Login</button></p>
        </div>
      )}
      {showLoginForm && (
        <div className="login-form">
          <h2>Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="loginIdentifier"
                name="loginIdentifier"
                placeholder="Name, Email, or Roll Number"
                value={loginFormData.loginIdentifier}
                onChange={handleLoginChange}
                className="form-control"
                required
              />
              {formErrors.loginIdentifier && <span className="error-message">{formErrors.loginIdentifier}</span>}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="Password"
                value={loginFormData.loginPassword}
                onChange={handleLoginChange}
                className="form-control"
                required
              />
              {formErrors.loginPassword && <span className="error-message">{formErrors.loginPassword}</span>}
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          <p>Don't have an account? <button onClick={toggleLoginForm}>Register</button></p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
