import { ListUrl } from '../url';
import instance from '../index';

const ListApi = async () => {
  try {
    const response = await instance.get(ListUrl);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 리스트 가져오기 성공 여부
      requests: response.data.Requests,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default ListApi;
