import { ENDPOINTS } from 'src/constants/endpoints.constants';
import config from 'src/config';
import TokenService from './token.service';

const USERS_ENDPOINT = config.API_ENDPOINT + ENDPOINTS.USERS;

const UserService = {
  async toggleDev(dev_secret) {
    const res = await fetch(`${USERS_ENDPOINT}/dev`, {
      method: 'PATCH',
      headers: TokenService.getHeaders(),
      body: JSON.stringify({ dev_secret }),
    });

    return await res.json();
  },
};

export default UserService;
