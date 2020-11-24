import config from '../config';
import TokenService from './token.service';

const AuthService = {
  async postUser(user) {
    try {
      const res = await fetch(
        `${config.API_ENDPOINT}/users/register`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(user),
        },
      );

      return await (res.ok
        ? res.json()
        : res.json().then((e) => Promise.reject(e)));
    } catch (err) {
      const message = err.error || err.message || err;
      const error = { error: message };

      return error;
    }
  },

  async postLogin(body) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/users/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      return await (res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err)));
    } catch (err) {
      const message = err.error || err.message || err;
      const error = { error: message };

      return error;
    }
  },

  async refreshToken() {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/users/token`, {
        method: 'GET',
        headers: TokenService.getHeaders(),
      });

      return await (res.ok
        ? res.json()
        : res.json().then((err) => Promise.reject(err)));
    } catch (err) {
      const message = err.error || err.message || err;
      const error = { error: message };

      return error;
    }
  },
};

export default AuthService;
