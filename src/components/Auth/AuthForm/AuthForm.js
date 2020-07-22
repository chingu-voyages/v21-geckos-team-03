import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFormValidation from '../../../hooks/useFormValidation';
import validateLogin from '../../../utils';
import firebase from '../../../firebase';

import { FlexContainer, UserFormStyles } from './styles';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

const AuthForm = () => {
  const history = useHistory();
  const [firebaseError, setFirebaseError] = useState(null);
  const [login, setLogin] = useState(true);
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    values,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
      history.push('/');
    } catch (error) {
      console.error('Authentication Error', error);
      setFirebaseError(error.message);
    }
  }

  return (
    <UserFormStyles>
      <h2>{login ? 'Login' : 'Create account'}</h2>
      <form onSubmit={handleSubmit}>
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name="email"
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          value={values.password}
          name="password"
          type="password"
          className={errors.password && 'error-input'}
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}

        <FlexContainer column>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </FlexContainer>
      </form>
      <div>
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </UserFormStyles>
  );
};

export default AuthForm;
