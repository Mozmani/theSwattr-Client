import jwtDecode from 'jwt-decode';

import config from '../config';

const { TOKEN_KEY } = config;

//token service file
const TokenService = {
  //saves auth token
  saveAuthToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  },

  //grabs auth token
  getAuthToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  },

  //clears auth token
  clearAuthToken() {
    window.localStorage.removeItem(TOKEN_KEY);
  },

  // checks if use has auth token
  hasAuthToken() {
    return !!this.getAuthToken();
  },

  // parse jwt
  parseJwt(jwt) {
    try {
      const payload = jwtDecode(jwt);
      return payload;
    } catch (err) {
      return err;
    }
  },

  //parses auth token
  parseAuthToken() {
    const authToken = this.getAuthToken();
    return authToken ? this.parseJwt(authToken) : undefined;
  },

  //creates headers for auth routes
  getHeaders() {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${this.getAuthToken()}`,
    };
  },
};

export default TokenService;
