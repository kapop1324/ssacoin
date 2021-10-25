import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedin from './isLoggedin';
import getRole from './getRole';

// 관리자가 아니면 '관리자' 페이지 접근 불가
// -> 로그인하지않았으면 로그인 페이지로 이동
// -> 유저라면 메인 페이지로 이동
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      // eslint-disable-next-line no-nested-ternary
      !isLoggedin() ? <Redirect to="/ssacoinlogin" />
        : getRole().toLowerCase() === 'user' ? <Redirect to="/" />
          : <Component {...props} />
    )}
  />
);

export default AdminRoute;
