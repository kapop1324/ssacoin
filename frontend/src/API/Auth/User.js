/* eslint-disable */
import { UserinfoUrl, leaveUrl, UserErcUrl, HistoryUrl } from '../url';
import instance from '../index';

const UserinfoApi = async (id) => {
  try {
    const response = await instance.get(UserinfoUrl+"?id="+id);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 로그아웃 성공 여부
      user: response.data.user, // 유저 정보
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

const LeaveApi = async (id) => {
  try {
    const response = await instance.delete(leaveUrl+"?id="+id);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 탈퇴 성공 여부
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

const UserErcApi = async (id) => {
  try {
    const response = await instance.get(UserErcUrl+"/"+id);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 코인 조회 성공 여부
      coin: response.data.UserCoin,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

const HistoryApi = async (id) => {
  try {
    const response = await instance.get(HistoryUrl+"/"+id);

    return {
      status: response.status, // 응답 종류
      result: response.data.message, // 코인 조회 성공 여부
      request: response.data.requestList, // 쿠폰샵 구매 리스트
      tradeBuy: response.data.tradeBuyList, // p2p 구매 리스트
      tradeSell: response.data.tradeSellList, // p2p 판매 리스트
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
}

export { UserinfoApi, LeaveApi, UserErcApi, HistoryApi };