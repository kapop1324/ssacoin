import axios from 'axios';

const p2pProductsCategoryApi = async (props) => {
  try {
    const response = await axios.post('http://j5c202.p.ssafy.io:8080/p2p/category', {
      couponCategory: props,
    });
    return {
      res: response.data.couponList,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default p2pProductsCategoryApi;
