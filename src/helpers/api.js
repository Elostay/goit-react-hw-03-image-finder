import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = async (query, page) => {
  const searchParams = new URLSearchParams({
    key: '39827869-ea8193496bafc954651761ff2',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    q: query,
    page: page,
  });
  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return response.data;
};

export default getImages;
