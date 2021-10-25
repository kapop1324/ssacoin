import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './scss/Login.scss';
import LoginApi from '../../API/Auth/Login';
import { LoginFail, LoginSuccess } from '../../Redux/Action/Auth';
import MyAlert from '../Common/MyAlert';
import Button1 from './Button1';
import ssacoin from '../../Assets/ssacoin.png';
import loginBackground from '../../Assets/loginBackgroundtest.png';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [alertIsOpen, setAlertOpen] = useState(false);

  /** 로그인 버튼 핸들러 */
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await LoginApi({ id, pw });

    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 로그인 성공
        dispatch(LoginSuccess(response));
        window.location.replace('/');
      } else {
        dispatch(LoginFail());
        setAlertOpen(true);
      }
    } else {
      dispatch(LoginFail());
      setAlertOpen(true);
    }
  };

  return (
    <div className="login-page">
      <img className="background" src={loginBackground} alt="로그인배경화면" />
      <div className="login-container">
        <div className="box">
          {/* 로고 및 타이틀 */}
          <img className="logo1" src={ssacoin} width="110" alt="ssacoin" />
          <h1 className="title">SSACOIN</h1>

          {/* 로그인 폼 */}
          <form className="form" onSubmit={loginHandler}>
            <p className="label">아이디</p>
            <input className="input input1" type="text" id="id" name="id" placeholder="ID" value={id} onChange={(e) => { setId(e.target.value); }} />
            <p className="label">비밀번호</p>
            <input className="input input2" type="password" id="pw" name="pw" placeholder="Password" value={pw} onChange={(e) => { setPw(e.target.value); }} />
            <Button1 className="loginButton" type="submit" name="로그인" />
          </form>

          {/* 회원가입 버튼 및 footer */}
          <hr className="line" />
          <button className="signup" type="button" onClick={() => history.push('./signup')}>회원가입</button>
          <div className="footer">
            <img className="logo2" src={ssacoin} width="25" alt="ssacoin" />
            <p className="content1">SSACOIN</p>
            <p className="content2"> | </p>
            <p className="content3">with SSAFY</p>
          </div>
        </div>
      </div>

      {/* 알림창 */}
      <MyAlert
        isOpen={alertIsOpen}
        alertOpen={setAlertOpen}
        type="auth"
        comment="loginFail"
        reload="/"
      />
    </div>
  );
};

export default Login;
