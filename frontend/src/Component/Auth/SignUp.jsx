/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './scss/SignUp.scss';
import { SignupApi, IdCheckApi, SIdCheckApi } from "../../API/Auth/Signup"
import MyAlert from '../Common/MyAlert';
import Button1 from './Button1';
import ssacoin from '../../Assets/ssacoin.png';

const SignUp = () => {
  const history = useHistory();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [studentid, setStudentid] = useState('');
  const [campus, setCampus] = useState('');

  const [idCheck, setIdCheck] = useState('empty');
  const [studentidCheck, setStudentidCheck] = useState('empty');

  const [alertIsOpen,setAlertOpen] = useState(false);
  const [alertComment, setAlertComment] = useState();

  /** 회원가입 버튼 핸들러 */
  const signupHandler = async (e) => {
    e.preventDefault();
    
    // 아이디, 회원가입 중복체크
    idCheckHandler();
    sidCheckHandler();
    if(idCheck !== 'success' || studentidCheck !== 'success') {
      return;
    }

    const userInfo = {
      id,
      pw,
      studentid,
      name,
      campus,
      role: "USER"
    }
    const response = await SignupApi(userInfo);
    
    if (response.status === 200) { // 응답 성공
      if(response.result.toLowerCase() === "success") { // 회원가입 성공
        setAlertComment("signupSuccess");
        setAlertOpen(true);
      } else {
        setAlertComment("signupFail");
        setAlertOpen(true);
      }
    } else { 
      setAlertComment("signupFail");
        setAlertOpen(true);
    }
  };

  /** 아이디 중복 체크 */
  const idCheckHandler = async () => {

    if(!id) {
      setIdCheck("empty");
      return;
    }

    const response = await IdCheckApi(id);

    if (response.status === 200) { // 응답 성공
      if(response.result === "success") { // id 중복없음
        setIdCheck("success");
      } else {
        setIdCheck("fail");
      }
    } else { 
      // console.log("응답 실패");
    }
  }

  /** 학번 중복 체크 */
  const sidCheckHandler = async () => {

    if(!studentid) {
      setStudentidCheck("empty");
      return;
    }

    const response = await SIdCheckApi(studentid);

    if (response.status === 200) { // 응답 성공
      if(response.result === "success") { // studentid 중복없음
        setStudentidCheck("success");
      } else {
        setStudentidCheck("fail");
      }
    } else { 
      // console.log("응답 실패");
    }
  }
  
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="box">
          {/* 로고 및 타이틀 */}
          <div className="header">
            <img className="logo1" src={ssacoin} width="55" alt="ssacoin" />
            <h1 className="title">SSACOIN</h1>
          </div>
          <hr className="line"/>

          {/* 회원가입 폼 */}
          <form className="form" onSubmit={signupHandler}>
            <div className="item item-check">
              <p className="label">아이디</p>
              <input className="input" type="text" id="id" name="id" value={id} onChange={(e) => { setId(e.target.value); }} onBlur={() => { idCheckHandler(); }} />
            </div>
            <div className="alert">
              { idCheck === 'empty' ? 
                  <div className="content empty" /> : 
                idCheck === "fail" ? 
                  <div className="content fail">이미 사용중인 아이디입니다.</div> :
                  <div className="content success">멋진 아이디이군요! </div> 
              }
            </div>
            <div className="item">
              <p className="label">비밀번호</p>
              <input className="input" type="password" id="pw" value={pw} onChange={(e) => { setPw(e.target.value); }} />
            </div>
            <div className="item">
              <p className="label">이름</p>
              <input className="input" type="text" id="name" name="name" value={name} onChange={(e) => { setName(e.target.value); }} />
            </div>
            <div className="item item-check">
              <p className="label">학번</p>
              <input className="input" type="text" id="studentid" name="studentid" value={studentid} onChange={(e) => { setStudentid(e.target.value); }} onBlur={() => { sidCheckHandler(); }}/>
            </div>
            <div className="alert">
              { studentidCheck === 'empty' || studentidCheck === 'success' ? 
                  <div className="content empty" /> : 
                  <div className="content fail">이미 사용중인 학번입니다.</div>
              }
            </div>
            <div className="item">
              <p className="label">캠퍼스</p>
              <select className="selectbox" id="campus" name="campus" value={campus} onChange={(e) => { setCampus(e.target.value); }}>
                <option value="none" hidden>캠퍼스를 선택해주세요.</option>
                <option value="서울">서울</option>
                <option value="대전">대전</option>
                <option value="구미">구미</option>
                <option value="광주">광주</option>
              </select>
            </div>
            <Button1 className="signupButton" type="submit" name="회원가입" />
          </form>

          {/* footer */}
          <div className="footer">
            <img className="logo2" src={ssacoin} width="25" alt="ssacoin" />
            <p className="content1">SSACOIN</p>
            <p className="content2"> | </p>
            <p className="content3">with SSAFY</p>
          </div>
        </div>

        {/* 알림창 */}
        <MyAlert
          isOpen={alertIsOpen}
          alertOpen={setAlertOpen}
          type="auth"
          comment={alertComment}
          reload="/"
        />
      </div>
    </div>
  );
};

export default SignUp;
