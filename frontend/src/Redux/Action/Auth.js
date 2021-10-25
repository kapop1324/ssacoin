import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../Type/Auth';

export const LoginSuccess = (userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: userInfo,
});

export const LoginFail = () => ({
  type: LOGIN_FAIL,
});

export const LogoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
