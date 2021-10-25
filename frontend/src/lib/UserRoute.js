import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedin from './isLoggedin';
import getRole from './getRole';

// 로그인하지않거나 관리자면 '로그인' '회원가입' 이 외의 유저 페이지 접근 불가
// -> 로그인하지않았으면 로그인 페이지로 이동
// -> 관리자이면 관리자 페이지로 이동
const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      // eslint-disable-next-line no-nested-ternary
      !isLoggedin() ? <Redirect to="/ssacoinlogin" />
        : getRole().toLowerCase() === 'admin' ? <Redirect to="/admin" />
          : <Component {...props} />
    )}
  />
);

export default UserRoute;
