import { ApproveUrl } from '../url';
import instance from '../indexAdmin';

const ApproveApi = async (data) => {
  try {
    const response = await instance.post(ApproveUrl, data);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 승인 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default ApproveApi;
