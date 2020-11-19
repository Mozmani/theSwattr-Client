import { ENDPOINTS } from 'src/constants/endpoints.constants';
import config from 'src/config';
import TokenService from './token.service';

const BUGS_ENDPOINT = config.API_ENDPOINT + ENDPOINTS.BUGS;

const BugsService = {
  async getAllBugs() {
    const res = await fetch(BUGS_ENDPOINT, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
};

export default BugsService;
