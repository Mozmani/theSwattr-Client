const dev = {
  API_ENDPOINT: process.env.REACT_APP_API_DEV_ENDPOINT || '',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || '',
  API_KEY: process.env.REACT_APP_API_KEY || '',
};

const prod = {
  API_ENDPOINT: process.env.REACT_APP_API_PROD_ENDPOINT || '',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || '',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default {
  ...config
};
