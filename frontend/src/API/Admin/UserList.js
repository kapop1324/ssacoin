/* eslint-disable */
import { UserListUrl } from '../url';
import instance from '../index';

const UserListApi = async () => {
  try {
    const response = await instance.get(UserListUrl);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 리스트 가져오기 성공 여부
      userList: response.data.Userlist //유저 리스트
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default UserListApi;