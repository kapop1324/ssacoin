import { SendMileageUrl } from '../url';
import instance from '../index';

const SendMileageApi = async (id, amount) => {
  try {
    const response = await instance.get(`${SendMileageUrl}/${id}/${amount}`);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 리스트 가져오기 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default SendMileageApi;
