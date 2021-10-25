import axios from 'axios';

const getMyCouponAPI = async (props) => {
  try {
    const response = await axios.get(`http://j5c202.p.ssafy.io:8080/mypage/coupon/${props}`);
    return {
      res: response,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default getMyCouponAPI;
