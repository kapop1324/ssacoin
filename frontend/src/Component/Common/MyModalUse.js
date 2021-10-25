/* eslint-disable */
import React, { useState } from 'react';
import MyModal from '../Common/MyModal';
import MySpinner from './MySpinner';
import imgUrl from '../../Assets/mypageBanner.jpeg';

const MyModalUse = () => {

  const [isOpen, setOpen] = useState(false); // 모달 미리 열려있을지
  const handleSubmit = () => setOpen(false); // 모달에서 확인 버튼 눌렀을 때
  const handleCancel = () => setOpen(false); // 모달에서 취소 버튼 눌렀을 때
  const shopDetail = {name: "스타벅스 커피", price: "5000", period: "2021년 10월 10일"};
  const marketSellDetail = {name: "스타벅스 커피", period: "2021년 10월 10일"};
  const marketBuyDetail = {name: "스타벅스 커피", price: "5000", period: "2021년 10월 10일", seller: "서울 1반 김싸피"};
  const myCouponDetail = {name: "스타벅스 커피", price: "5000", period: "2021년 10월 10일", comment: "Q&A 답변 모범생으로 선정되셔서 드립니다"};
  const adminDetail = {name: "스타벅스 커피", receiver: "서울 1반 김싸피"};

  const [alertIsOpen,setAlertOpen] = useState(false);

  return (
    <div className="modalTest">
  
      {/* alert 테스트 */}
      <button onClick={() => setAlertOpen(true)}>alert 열기</button>
      <MyAlert 
      isOpen={alertIsOpen}
      alertOpen={setAlertOpen}
      type="shop"
      comment="success"
      reload="/"
      />

      {/* spinner */}
      <MySpinner 
      isOpen={alertIsOpen}
      type="shop"
      />

      {/* 모달 테스트 */}
      <button onClick={() => setOpen(true)}>모달 열기</button>

      {/* Shop */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      type="shop"
      title="쿠폰 구매하기"
      photo={imgUrl}
      detail={shopDetail} 
      submitName="구매하기"
      />

      {/* Market 판매 */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      type="marketSell"
      title="쿠폰 판매하기"
      photo={imgUrl}
      detail={marketSellDetail} 
      submitName="등록하기"
      />

      {/* Market 구매 */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      type="marketBuy"
      title="제목"
      photo={imgUrl}
      detail={marketBuyDetail} 
      submitName="구매하기"
      />

      {/* MyCoupon */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      type="myCoupon"
      title="쿠폰 상세정보"
      photo={imgUrl}
      detail={myCouponDetail} 
      submitName="사용하기"
      />

      {/* Manager */}
      <MyModal 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      type="admin"
      title="승인 요청"
      photo={imgUrl}
      detail={adminDetail} 
      submitName="승인하기"
      />
      
    </div>
  );
};

export default MyModalUse;
