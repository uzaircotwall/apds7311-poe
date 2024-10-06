
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Registration = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', values);
      if (response.data.success) {
        navigate('/login');  // Redirect to login after successful registration
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Error during registration');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Registration;
