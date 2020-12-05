import { ENDPOINTS } from 'src/constants/endpoints.constants';
import config from 'src/config';
import TokenService from './token.service';

const BUGS_ENDPOINT = config.API_ENDPOINT + ENDPOINTS.BUGS;

//bugs service file
const BugsService = {
  //grabs all bugs
  async getAllBugs() {
    const res = await fetch(BUGS_ENDPOINT, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },

   //grabs all bugs by severity
  async getAllBugsSeverityApp(app) {
    const res = await fetch(
      `${config.API_ENDPOINT}/sort/severity/${app}`,
      {
        method: 'GET',
        headers: TokenService.getHeaders(),
      },
    );

    return await res.json();
  },

   //grabs all apps
  async getAllApps() {
    const res = await fetch(`${config.API_ENDPOINT}/app`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
   //grabs all bugs by severity from app
  async getAllSeverity() {
    const res = await fetch(`${config.API_ENDPOINT}/app/severity`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
   //grabs all bugs by status
  async getAllStatus() {
    const res = await fetch(`${config.API_ENDPOINT}/app/status`, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },

   //grabs all bugs by user
  async getAllBugsUser(user) {
    const res = await fetch(
      `${config.API_ENDPOINT}/bugs/user/${user}`,
      {
        method: 'GET',
        headers: TokenService.getHeaders(),
      },
    );

    return await res.json();
  },

  // posts a new bug
  async postNewBug(newBug) {
    const res = await fetch(`${config.API_ENDPOINT}/bugs`, {
      method: 'POST',
      headers: TokenService.getHeaders(),
      body: JSON.stringify(newBug),
    });

    return await res.json();
  },
   //grabs bug by id
  async getBugById(id){
    const res = await fetch(
    `${config.API_ENDPOINT}/bugs/${id}`,
      {
        method: 'GET',
        headers: TokenService.getHeaders(),
      },
    )
    return await res.json();
  },
  //patches bug
  async editBug(newBug, id) {
    const res = await fetch(`${config.API_ENDPOINT}/edit/${id}`, {
      method: 'PATCH',
      headers: TokenService.getHeaders(),
      body: JSON.stringify(newBug),
    });

    return await res.json();
  },
};

export default BugsService;
