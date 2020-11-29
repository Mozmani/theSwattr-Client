import { ENDPOINTS } from 'src/constants/endpoints.constants';
import config from 'src/config';
import TokenService from './token.service';

const COMMENTS_ENDPOINT = config.API_ENDPOINT + ENDPOINTS.COMMENTS;

const CommentsService = {
  async getAllComments() {
    const res = await fetch(COMMENTS_ENDPOINT, {
      method: 'GET',
      headers: TokenService.getHeaders(),
    });

    return await res.json();
  },

  async getAllBugComments(bugId) {
    const res = await fetch(
      `${config.API_ENDPOINT}/comments/bug/${bugId}`,
      {
        method: 'GET',
        headers: TokenService.getHeaders(),
      },
    );

    return await res.json();
  },

  async postNewComment(newComment) {
    const res = await fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: TokenService.getHeaders(),
      body: JSON.stringify(newComment),
    });

    return await res.json();
  },
};

export default CommentsService;
