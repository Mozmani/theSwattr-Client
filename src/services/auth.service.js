import config from '../config';

const AuthService = {
  async postUser(user) {
    const res = await fetch(`${config.API_ENDPOINT}/users/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },

  async postLogin(body) {
    try {
      const res = await fetch(`${config.API_ENDPOINT}/users/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return await (!res.ok
        ? res.json().then((err) => Promise.reject(err))
        : res.json());
    } catch (err) {
      const message = err.error || err.message || err;
      const error = { error: message };
      return error;
    }

    // const res = await fetch(`${config.API_ENDPOINT}/users/login`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify({ user_name, password }),
    // });

    // return await (!res.ok
    //   ? res.json().then((err) => Promise.reject(err))
    //   : res.json());
  },
};

export default AuthService;
