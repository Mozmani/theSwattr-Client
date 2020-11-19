import jwtDecode from 'jwt-decode';
import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!this.getAuthToken();
  },

  parseJwt(jwt) {
    try {
      const payload = jwtDecode(jwt);
      return payload;
    } catch (err) {
      return err;
    }
  },

  parseAuthToken() {
    const authToken = this.getAuthToken();
    if (authToken) return this.parseJwt(authToken);
    else return undefined;
  },

  getHeaders() {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${this.getAuthToken()}`,
    };
  },
};

export default TokenService;
