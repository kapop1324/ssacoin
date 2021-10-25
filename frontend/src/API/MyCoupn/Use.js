import axios from 'axios';

const useMyCouponAPI = async (props) => {
  try {
    const response = await axios.delete(`http://j5c202.p.ssafy.io:8080/mypage/coupon/${props}`);
    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 사용 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default useMyCouponAPI;
