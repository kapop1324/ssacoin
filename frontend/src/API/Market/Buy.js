/* eslint-disable */
import { marketBuyUrl } from '../url';
import instance from '../index';

const marketBuyApi = async (request) => {
  try {
    const response = await instance.post(marketBuyUrl, request);
    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 구매 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default marketBuyApi;