import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedin from './isLoggedin';

// 로그인한 유저이면 '로그인' '회원가입' 페이지 접근 불가
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedin() ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

export default PublicRoute;
