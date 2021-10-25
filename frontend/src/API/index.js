import axios from 'axios';

const createInstance = () => axios.create({
  baseURL: 'http://j5c202.p.ssafy.io:8080',
  headers: {
    'Content-type': 'application/json',
  },
});

const instance = createInstance();

export default instance;
