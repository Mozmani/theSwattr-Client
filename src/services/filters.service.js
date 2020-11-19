import { ENDPOINTS } from 'src/constants/endpoints.constants';
import config from 'src/config';
import TokenService from './token.service';

const FILTERS_ENDPOINT = config.API_ENDPOINT + ENDPOINTS.FILTERS;

const FiltersService = {
  async getAllFilters() {
    const res = await fetch(FILTERS_ENDPOINT, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },
};

export default FiltersService;
