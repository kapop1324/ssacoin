/* eslint-disable */
import { LogoutUrl } from '../url';
import instance from '../index';

const LogoutApi = async (id) => {
  try {
    const response = await instance.get(LogoutUrl+"?id="+id);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 로그아웃 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default LogoutApi;