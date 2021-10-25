import axios from 'axios';
import getId from '../lib/getId';
import getToken from '../lib/getToken';

const createInstance = () => axios.create({
  baseURL: 'http://j5c202.p.ssafy.io:8080',
  headers: {
    'Content-type': 'application/json',
    id: getId(),
    authorization: getToken(),
  },
});

const indexUser = createInstance();

export default indexUser;
