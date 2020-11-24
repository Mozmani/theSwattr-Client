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
  async getAllBugsDev(app){
    const res = await fetch(`${config.API_ENDPOINT}/sort/severity/${app}`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
  async getAllApps(){
    const res = await fetch(`${config.API_ENDPOINT}/app`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
  async getAllBugsUser(user){
    const res = await fetch(`${config.API_ENDPOINT}/bugs/user/${user}`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  }
};

export default BugsService;
