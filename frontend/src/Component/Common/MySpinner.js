/* eslint-disable */
import React, { useState } from 'react';
import Modal from 'react-modal';
import './scss/MySpinner.scss'

/*
1. isOpen: true - 모달창이 미리 열려있음, false - 모달창이 닫혀있음
2. onClick: 확인 눌렀을 때 이벤트
3. type : 페이지 종류
4. comment : 코멘트
5. reload : 확인 버튼 누르면 새로고침할 주소
*/
const MySpinner = ({isOpen, alertOpen, type, comment, reload}) => {
  
  /* 모달 스타일 */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width : '250px',
      height : '140px',
      backgroundColor: 'white',
      borderRadius: '10px',
      borderColor: "gray",
      borderWidth: '4px',
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      {/* 스피너 */}
      <div className="text-center">      
        <div className="spinner spinner-border text-secondary" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
      {/* 내용 */}
      <div className="spinnerComment"> 처리중입니다. </div>
    </Modal>
  );
}

export default MySpinner;