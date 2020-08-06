import moment from 'moment';

export function validateLogin(values) {
  const errors = {};

  // Email Errors
  if (!values.email) {
    errors.email = 'Email Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid Email address';
  }
  //  Password Errors
  if (!values.password) {
    errors.password = 'Password Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors;
}

export function validateListForm(values) {
  const errors = {};

  // changed this to strictly equals
  if (!values.title || values.title === '') {
    errors.title = 'Title Required';
  }
  return errors;
}

// Format Dates
export function formatDate(dateStr) {
  return moment(dateStr).format('MMM Do YYYY');
}
