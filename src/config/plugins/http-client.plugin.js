import axios from 'axios';

export const httpClient = {
  get: async (url) => {
    const { data } = await axios.get(url);

    return data;
  },
  post: async (url, body) => {
    throw new Error('Not implemented');
  },
  patch: async (url, body) => {
    throw new Error('Not implemented');
  },
  delete: async (url) => {
    throw new Error('Not implemented');
  },
};
