/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListApi from '../../API/Admin/List';
import LogoutApi from '../../API/Auth/LogOut';
import getId from '../../lib/getId';
import LogoutProcess from '../../lib/LogoutProcess';
import { LogoutSuccess } from '../../Redux/Action/Auth';
import Board from './Board';
import Mileage from './Mileage';
import './scss/Index.scss'

const Index = () => {

  const dispatch = useDispatch();

  /* 승인 요청 데이터 */
  // const [all, setAll] = useState([]);
  /* 승인 요청 데이터 */
  const [yetData, setYetData] = useState([]);
  /* 승인 완료 데이터 */
  const [doneData, setDoneData] = useState([]);
  /* 표에 표시할 데이터 */
  const [data,setData] = useState([])

  /* 전체 데이터 가져오기 & 필터링 */
  useEffect(async()=>{
    window.scrollTo(0, 0);
    let all = [];
    const response = await ListApi();

    if (response.status === 200) { // 응답 성공
      if (response.result.toLowerCase() === 'success') { // 데이터 가져오기 성공
        all = response.requests;
      } else {
        console.log('데이터 가져오기 실패');
      }
    } else {
      console.log('응답 실패');
    }

    setYetData(
      all &&
        all.filter(item => {
          return item.requestStatus === "0";
        })
    );

    setDoneData(
      all &&
        all.filter(item => {
          return item.requestStatus === "1";
        })
    );
  }, [])

  //로그아웃 핸들러
  const logoutHandler = async () => {
    const response = await LogoutApi(getId());

    if (response.status === 200) { // 응답 성공
      if (response.result === 'success') { // 로그아웃 성공
        LogoutProcess(response);
        dispatch(LogoutSuccess());
        window.location.replace('/ssacoinlogin');
      } else {
        //console.log('로그아웃 실패');
      }
    } else {
      //console.log('응답 실패');
    }
  };

  return (
    <div className="admin container">

      {/* 마일리지 보내기 */}
      <Mileage />

      {/* 버튼 */}
      <div className="wrapper">
        <input type="radio" name="select" id="option-1" onChange={() => setData(yetData)} />
        <input type="radio" name="select" id="option-2" onChange={() => setData(doneData)}/>
        <label htmlFor="option-1" className="option option-1">
          <div className="dot"></div>
            <span>승인 요청</span>
          </label>
        <label htmlFor="option-2" className="option option-2">
          <div className="dot"></div>
            <span>승인 완료</span>
        </label>
      </div>

      {/* 표 */}
      <Board className="board" data={data}/>

       {/* 로그아웃 */}
      <div>
        <button type="button" className="adminLogout" onClick={() => logoutHandler()}>Logout</button>
      </div>
    </div>
  )
}

export default Index;