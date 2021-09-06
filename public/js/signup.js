/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  showAlert('success', `Created new user with name: ${name}`);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Created new account');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    //console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
