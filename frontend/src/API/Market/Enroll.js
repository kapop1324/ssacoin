import axios from 'axios';

const EnrollTradeApi = async (tradeInfo) => {
  try {
    const response = await axios.post('http://j5c202.p.ssafy.io:8080/p2p/register', tradeInfo);
    return {
      res: response,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default EnrollTradeApi;
