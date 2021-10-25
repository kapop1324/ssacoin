import React, { useState } from 'react';
import StyledButton from '../Common/MyButton';
import MyModal from '../Common/MyModal';
import basicImg from '../../Assets/noFile.jpg';
import EnrollTradeApi from '../../API/Market/Enroll';
import MyAlert from '../Common/MyAlert';

export default function couponSell() {
  const [isOpen, setOpen] = useState(false);

  /* alert 변수 */
  const [alertComment, setAlertComment] = useState('');
  const [alertIsOpen, setAlertOpen] = useState(false); // alert 미리 열려있을지

  const handleSubmit = (props) => {
    const enrollData = {
      tradeRequestId: props.tradeRequestId,
      tradeCouponId: props.tradeCouponId,
      tradeTitle: props.tradeTitle,
      tradeMileage: props.tradeMileage,
    };
    setOpen(false);
    if (props.tradeMileage <= props.couponMileage) {
      EnrollTradeApi(enrollData);
      setAlertComment('marketSell');
    } else {
      setAlertComment('marketSellFail');
    }setAlertOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton p2pyellow onClick={() => setOpen(true)}>상품 등록하기</StyledButton>
      <MyModal
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        type="marketSell"
        title="쿠폰 판매하기"
        photo={basicImg}
        detail=""
        submitName="등록하기"
      />

      <MyAlert
        isOpen={alertIsOpen}
        alertOpen={setAlertOpen}
        type="marketSell"
        comment={alertComment}
        reload="/market"
      />
    </div>
  );
}
