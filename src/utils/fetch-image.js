import axios from 'axios';

export const fetchImages = async (query, page) => {
  axios.defaults.baseURL = 'https://pixabay.com/api';
  const API_KEY = '30913652-44dd132e2d5af231f1a716f92';
  const params = 'per_page=12&orientation=horizontal';

  return await axios.get(`/?key=${API_KEY}&${params}&q=${query}&page=${page}`);
};
