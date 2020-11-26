import jwtDecode from 'jwt-decode';

import config from '../config';

const { TOKEN_KEY } = config;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(TOKEN_KEY);
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
    return authToken ? this.parseJwt(authToken) : undefined;
  },

  getHeaders() {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${this.getAuthToken()}`,
    };
  },
};

export default TokenService;
