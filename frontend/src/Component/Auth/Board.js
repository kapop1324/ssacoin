import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserinfoApi, LeaveApi, UserErcApi } from '../../API/Auth/User';
import getId from '../../lib/getId';
import Button2 from './Button2';
import './scss/Board.scss';
import LogoutApi from '../../API/Auth/LogOut';
import { LogoutSuccess } from '../../Redux/Action/Auth';

const Board = ({ history }) => {
  const [info, setInfo] = useState({});
  const [coin, setCoin] = useState();

  useEffect(async () => {
    // 유저 기본 정보
    const response1 = await UserinfoApi(getId());

    if (response1.status === 200) { // 응답 성공
      if (response1.result === 'success') { // 유저 정보 가져오기 성공
        setInfo(response1.user);
      } else {
        // console.log('유저 정보 가져오기 실패');
      }
    } else {
      // console.log('응답 실패');
    }

    // 마일리지 정보
    const response2 = await UserErcApi(getId());

    if (response2.status === 200) { // 응답 성공
      if (response2.result && response2.result.toLowerCase() === 'success') { // 코인 정보 가져오기 성공
        setCoin(response2.coin);
      } else {
        // console.log('코인 정보 가져오기 실패');
      }
    } else {
      // console.log('응답 실패');
    }
  }, []);

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const response = await LogoutApi(getId());

    if (response.status === 200) { // 응답 성공
      if (response.result === 'success') { // 로그아웃 성공
        dispatch(LogoutSuccess());
        window.location.replace('/');
      } else {
        // console.log('로그아웃 실패');
      }
    } else {
      // console.log('응답 실패');
    }
  };

  const leaveHandler = async () => {
    const response = await LeaveApi(getId());
    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 회원탈퇴 성공
        dispatch(LogoutSuccess());
        window.location.replace('/');
      } else {
        // console.log('회원 탈퇴 실패');
      }
    } else {
      // console.log('응답 실패');
    }
  };

  return (
    <div className="board">
      {/* 나의 기본 및 마일리지 정보 */}
      <div className="myInfo">
        <div className="myBasic">
          <div className="section name">
            <div className="label">이름</div>
            <div className="input">{info.name}</div>
          </div>
          <div className="section email">
            <div className="label">이메일</div>
            <div className="input">{info.id}</div>
          </div>
          <div className="section sid">
            <div className="label">학번</div>
            <div className="input">{info.studentid}</div>
          </div>
          <div className="section campus">
            <div className="label">캠퍼스</div>
            <div className="input">{info.campus}</div>
          </div>
          <Button2 id="logoutButton" className="logoutButton" name="로그아웃" fuc={logoutHandler} />
          <Button2 className="leaveButton" name="탈퇴하기" fuc={leaveHandler} />
        </div>
        <div className="vertical" />
        {/* <hr className="horizontal" /> */}
        <div className="myMillege">
          <div className="title">나의 마일리지</div>
          <div className="section nowMillege">
            <div className="label">사용 가능 마일리지</div>
            <div className="input1">{coin}</div>
            <div className="input2">M</div>
          </div>
          <div className="section cumMillege">
            <div className="label">누적 판매 마일리지</div>
            <div className="input">
              {history[0]}
              M
            </div>
          </div>
          <hr className="line" />
          <div className="section useMillege">
            <div className="label">누적 구매 마일리지</div>
            <div className="input">
              {history[1]}
              M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
