/* eslint-disable */
import { LoginUrl } from '../url';
import instance from '../index';

const LoginApi = async (userInfo) => {
  try {
    const response = await instance.post(LoginUrl, userInfo);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 로그인 성공 여부
      role: response.data.role,
      id: response.data.id,
      token: response.headers.authorization,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default LoginApi;