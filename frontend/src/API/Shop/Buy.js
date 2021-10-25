/* eslint-disable */
import { shopBuyUrl } from '../url';
import instance from '../index';

const shopBuyApi = async (request) => {
  try {
    console.log(request);
    const response = await instance.post(shopBuyUrl, request);
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

export default shopBuyApi;