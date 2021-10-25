import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS } from '../Type/Auth';

const initialState = {
  isLoggedIn: false,
  userInfo: {},
};

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };
    default:
      return state;
  }
};

export default Auth;
