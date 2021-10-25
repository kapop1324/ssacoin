/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import './scss/MyAlert.scss'

/*
1. isOpen: true - 모달창이 미리 열려있음, false - 모달창이 닫혀있음
2. onClick: 확인 눌렀을 때 이벤트
3. type : 페이지 종류
4. comment : 코멘트
5. reload : 확인 버튼 누르면 새로고침할 주소
*/
const MyAlert = ({isOpen, alertOpen, type, comment, reload}) => {
  
  const typeColor = {
    auth : "#3396f4",
    shop : "#3396f4",
    marketSell : "#ebd02f",
    marketBuy : "#3396f4",
    myCoupon : "#ebd02f",
    admin : "#3fce32",
  }

  const typeComment = {
    success : "구매가 완료되었습니다.",
    fail : "마일리지가 부족합니다..",
    marketSellFail : "쿠폰이 너무 비쌉니다ㅠ",
    marketSell : "등록이 완료되었습니다.",
    myCoupon : "사용이 완료되었습니다.",
    adminSuccess : "승인이 완료되었습니다.",
    adminFail : "승인에 실패했습니다.",
    adminMileageSuccess: "전송이 완료되었습니다.",
    adminMileageFail: "전송을 실패했습니다.",
    loginFail: "로그인에 실패했습니다.",
    signupSuccess: "회원가입이 완료되었습니다.",
    signupFail: "회원가입에 실패했습니다.",
    shopSuccess: "요청이 완료되었습니다."
  }
  
  /* 모달 스타일 */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width : '270px',
      height : '190px',
      backgroundColor: 'white',
      borderRadius: '10px',
      borderColor: typeColor[type],
      borderWidth: '4px',
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      {/* 내용 */}
      <div className="alertTitle"> {typeComment[comment]} </div>

      {/* 버튼 */}
      <button className="alertButton" type="button" onClick={()=>{alertOpen(false); window.location.replace(`${reload}`);}} style={{backgroundColor:typeColor[type]}}>확인</button>
    </Modal>
  );
}

export default MyAlert;