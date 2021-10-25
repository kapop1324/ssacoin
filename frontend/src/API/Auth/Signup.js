import { SignupUrl, IdCheckUrl, SIdcheckUrl } from '../url';
import instance from '../index';

const SignupApi = async (userInfo) => {
  try {
    const response = await instance.post(SignupUrl, userInfo);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 회원가입 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

const IdCheckApi = async (id) => {
  try {
    const response = await instance.get(`${IdCheckUrl}?id=${id}`);

    return {
      status: response.status,
      result: response.data.message,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

const SIdCheckApi = async (sid) => {
  try {
    const response = await instance.get(`${SIdcheckUrl}?studentid=${sid}`);

    return {
      status: response.status,
      result: response.data.message,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export { SignupApi, IdCheckApi, SIdCheckApi };
