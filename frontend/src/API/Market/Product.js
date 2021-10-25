import axios from 'axios';

const p2pAllProductsApi = async () => {
  try {
    const response = await axios.get('http://j5c202.p.ssafy.io:8080/p2p/');
    return {
      res: response.data.tradeList,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default p2pAllProductsApi;
